<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AcademicYers;
use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CourseRequest;
use App\Http\Resources\Admin\CourseResource;
use App\Models\Course;
use App\Models\Departemen;
use App\Models\Fakultas;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

use function App\helpers\activeAcademicYear;
use function App\helpers\flashMessage;

class CourseController extends Controller
{
    public function index(): Response
    {
        $courses = Course::query()
            ->select(['courses.id','courses.name','courses.code','courses.credit','courses.semester','courses.fakultas_id',
                'courses.departemen_id','courses.teacher_id','courses.academic_year_id','courses.created_at'])
            // filter
            ->filter(request()->only(['search']))
            // sorting
            ->sorting(request()->only(['field', 'direction']))
            // relasi
            ->with(['faculty', 'departemen', 'teacher'])
            // role
            ->paginate(request()->load ?? 10);
        return Inertia::render('Admin/Courses/Index', [
            'page_settings' => [
                'title' => 'Dahsboard Mata Kuliah',
                'subtitle' => 'Halaman ini menampilkan daftar mata kuliah di universitas ini'
            ],
            'courses' => CourseResource::collection($courses)->additional([
                'meta' => [
                    'has_pages' => $courses->hasPages()
                ]
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Courses/Create', [
            'page_settings' => [
                'title' => 'Halaman tambah data mata kuliah',
                'subtitle' => 'Tambahkan data mata kuliah di sini.',
                'method' => 'POST',
                'action' => route('admin.courses.store')
            ],
            'faculties' => Fakultas::query()->select(['id', 'name'])->orderBy('name')
                ->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name
                ]),
            'departements' => Departemen::query()->select(['id', 'name'])->orderBy('name')
                ->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name
                ]),
            'teachers' => Teacher::query()
                ->select(['id', 'user_id'])
                ->whereHas('user', function($query){
                    $query->whereHas('roles', fn($query) => $query->where('name', 'Teacher'))->orderBy('name');
                })
                ->get()
                ->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->user?->name
                ])
        ]);
    }

    public function store(CourseRequest $request): RedirectResponse
    {
        // dd(request()->all());
        try {
            Course::create([
                'fakultas_id' => $request->fakultas_id,
                'departemen_id' => $request->departemen_id,
                'teacher_id' => $request->teacher_id,
                'academic_year_id' => activeAcademicYear()->id,
                'code' => str()->random(10),
                'name' => $request->name,
                'credit' => $request->credit,
                'semester' => $request->semester,
            ]);
            flashMessage(MessageTypes::CREATED->message('Mata kuliah'));
            return redirect()->route('admin.courses.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return redirect()->route('admin.courses.index');
        }
    }

    public function edit(Course $course): Response
    {
        return Inertia::render('Admin/Courses/Edit', [
            'page_settings' => [
                'title' => 'Halaman edit data mata kuliah',
                'subtitle' => 'Edit data mata kuliah di sini.',
                'method' => 'PUT',
                'action' => route('admin.courses.update', $course)
            ],
            'course' => $course,
            'faculties' => Fakultas::query()->select(['id', 'name'])->orderBy('name')
                ->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name
                ]),
            'departements' => Departemen::query()->select(['id', 'name'])->orderBy('name')
                ->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name
                ]),
            'teachers' => Teacher::query()
                ->select(['id', 'user_id'])
                ->whereHas('user', function($query){
                    $query->whereHas('roles', fn($query) => $query->where('name', 'Teacher'))->orderBy('name');
                })
                ->get()
                ->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->user?->name
                ])
        ]);
    }

    public function update(Course $course,CourseRequest $request): RedirectResponse
    {
        try {
            $course->update([
                'fakultas_id' => $request->fakultas_id,
                'departemen_id' => $request->departemen_id,
                'teacher_id' => $request->teacher_id,
                'name' => $request->name,
                'credit' => $request->credit,
                'semester' => $request->semester,
            ]);
            flashMessage(MessageTypes::UPDATED->message('Mata kuliah'));
            return redirect()->route('admin.courses.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return redirect()->route('admin.courses.index');
        }
    }

    public function destroy(Course $course) : RedirectResponse
    {
        try {
            $course->delete();
            flashMessage(MessageTypes::DELETED->message('Mata kuliah'));
            return redirect()->route('admin.courses.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return redirect()->route('admin.courses.index');
        }
    }
}
