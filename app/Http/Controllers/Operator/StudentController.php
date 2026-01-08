<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Http\Resources\Operators\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Response;

class StudentController extends Controller
{
    public function index(): Response
    {
        $students = Student::query()
            ->select([
                'students.id',
                'students.user_id',
                'students.fakultas_id',
                'students.departement_id',
                'students.kelas_id',
                'students.fee_group_id',
                'students.semester',
                'students.batch',
                'students.students_number',
                'students.created_at'
            ])
            ->with(['user', 'feeGroup', 'kelas'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->whereHas('user', function ($query) {
                $query->whereHas('roles', fn($query) => $query->where('name', 'Student'));
            })
            ->where('students.fakultas_id', auth()->user()->operator->fakultas_id)
            ->where('departement_id', auth()->user()->operator->departement_id)
            ->paginate(request()->load ?? 10);

            // Egear loading
            $user = auth()->user()->load('operator.fakultas', 'operator.departement');

        return inertia('Operator/Students/Index', [
            'page_settings' => [
                'title' => 'Daftar Mahasiswa',
                'subtitle' => "Menampilkan semua mahasiswa yang ada di {$user->operator?->fakultas->name} dan {$user->operator?->departement->name}.",
            ],
            'students' => StudentResource::collection($students)->additional([
                'meta' => [
                    'has_pages' => $students->hasPages(),
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? null,
                'load' => 10,
            ],
        ]);
    }
}
