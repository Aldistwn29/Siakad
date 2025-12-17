<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TeacherRequest;
use App\Http\Resources\Admin\TeacherResource;
use App\Models\Departemen;
use App\Models\Fakultas;
use App\Models\Teacher;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;
use function App\helpers\flashMessage;

class TeacherController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $teachers = Teacher::query()
            ->select('teachers.*')
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['user', 'faculty', 'departemen'])
            ->whereHas('user', function ($query) {
                $query->whereHas('roles', fn($query) => $query->where('name', 'teacher'));
            })
            ->paginate(request()->load ?? 10);

        return Inertia('Admin/Teachers/Index', [
            'page_settings' => [
                'title' => 'Dashboard Teacher',
                'subtitle' => 'Halaman ini menampilkan data semua teacher yang terdaftar di sistem.'
            ],
            'teachers' => TeacherResource::collection($teachers)->additional([
                'meta' => [
                    'has_pages' => $teachers->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
                'field' => request()->field ?? '',
                'direction' => request()->direction ?? '',
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia('Admin/Teachers/Create', [
            'page_settings' => [
                'title' => 'Dashboard Teacher',
                'subtitle' => 'Halaman ini menampilkan form untuk menambahkan teacher baru',
                'method' => 'POST',
                'action' => route('admin.teachers.store')
            ],
            'faculties' => Fakultas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name
            ]),
            'departements' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name
            ]),
        ]);
    }

    public function store(TeacherRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            // valudasi untuk form data user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'avatar' => $this->upload_file($request, 'avatar', 'users')
            ]);
            // validasikan data user ke relasi teacher
            $user->teacher()->create([
                'fakultas_id' => $request->fakultas_id,
                'departement_id' => $request->departement_id,
                'teachers_number' => $request->teachers_number,
                'academic_title' => $request->academic_title
            ]);
            // assign ke role Teacher
            $user->assignRole('Teacher');

            DB::commit();
            // flash message dan pengembalian
            flashMessage(MessageTypes::CREATED->message('Dosen'));
            return to_route('admin.teachers.index');
        } catch (Throwable $e) {
            DB::rollBack();

            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.teachers.index');
        }
    }

    public function edit(Teacher $teacher): Response
    {
        return Inertia('Admin/Teachers/Edit', [
            'page_settings' => [
                'title' => 'Dashboard Teacher',
                'subtitle' => 'Halaman ini menampilkan form untuk menambahkan teacher baru',
                'method' => 'PUT',
                'action' => route('admin.teachers.update', $teacher)
            ],
            'teacher' => $teacher->load('user'),
            'faculties' => Fakultas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name
            ]),
            'departements' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name
            ]),
        ]);
    }

    public function update(Teacher $teacher, TeacherRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $teacher->update([
                'fakultas_id' => $request->fakultas_id,
                'departement_id' => $request->departement_id,
                'teachers_number' => $request->teachers_number,
                'academic_title' => $request->academic_title
            ]);
            // update data user
            $teacher->user()->update([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->passward ? Hash::make($request->password) : $teacher->user->password,
                'avatar' => $this->update_file($request, $teacher->user, 'avatar', 'users')
            ]);
            DB::commit();

            // flash message dan pengembalian
            flashMessage(MessageTypes::UPDATED->message('Dosen'));
            return to_route('admin.teachers.index');
        } catch (Throwable $e) {
            DB::rollBack();

            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.teachers.index');
        }
    }

    public function destroy(Teacher $teacher) : RedirectResponse
    {
        try {
            $this->delete_file($teacher->user, 'avatar');
            $teacher->delete();
            // message
            flashMessage(MessageTypes::DELETED->message('Dosen'));
            return to_route('admin.teachers.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.teachers.index');
        }
    }
}
