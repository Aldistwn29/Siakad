<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ClassroomsStudentRequest;
use App\Http\Resources\Admin\ClassroomStudentResource;
use App\Models\Kelas;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use ParaTest\JUnit\MessageType;
use Throwable;

use function App\helpers\flashMessage;

class ClassromStudentController extends Controller
{
    public function index(Kelas $classroom): Response
    {
        $classroomStudents = Student::query()
            ->select(['id', 'user_id', 'kelas_id', 'students_number', 'created_at'])
            ->where('kelas_id', $classroom->id)
            ->whereHas('user', function ($query) {
                $query->whereHas('roles', fn($query) => $query->where('name', 'Student'));
            })
            ->orderBy('students_number')
            ->with(['user'])
            ->paginate(10);

        return inertia('Admin/Kelas/Students/Index', [
            'page_settings' => [
                'title' => "Kelas $classroom->name",
                'subtitle' => 'Menampilkan semua data mahasiswa yang tersedia pada kelas ini',
                'method' => 'PUT',
                'action' => route('admin.classroms-students.sync', $classroom)
            ],
            'students' => Student::query()
                ->select(['id', 'user_id', 'fakultas_id', 'departement_id', 'kelas_id'])
                ->whereHas('user', function ($query) {
                    $query->whereHas('roles', fn($query) => $query->select(['id', 'name'])->where('name', 'Student'))->orderBy('name');
                })
                ->where('fakultas_id', $classroom->facultas_id)
                ->where('departement_id', $classroom->departemen_id)
                ->whereNull('kelas_id')
                ->get()
                ->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->user->name,
                ]),
            'classroomStudents' => ClassroomStudentResource::collection($classroomStudents),
            'classroom' => $classroom,
        ]);
    }

    public function sync(Kelas $classroom, ClassroomsStudentRequest $request): RedirectResponse
    {
        try {
            Student::whereHas('user', fn($query) =>
            $query->where('name', $request->student))->update([
                'kelas_id' => $classroom->id
            ]);
            flashMessage("Berhasil Menambahkan mahasiswa baru ke dalam kelas {$classroom->name}");
            return to_route('admin.classroms-students.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage(), 'error'));
            return to_route('admin.classroms-students.index');
        }
    }

    public function destroy(Kelas $classroom, Student $student): RedirectResponse
    {
        try {
            $student->update([
                'kelas_id' => null,
            ]);
            flashMessage("Berhasil menghapus mahasiswa dari kelas {$classroom->name}");
            return to_route('admin.classroms-students.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage(), 'error'));
            return to_route('admin.classroms-students.index');
        }
    }
}
