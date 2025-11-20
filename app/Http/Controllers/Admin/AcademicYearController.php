<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AcademicYers;
use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AcademicYearRequest;
use App\Http\Resources\Admin\AcademicYearResource;
use App\Models\AcademicYear;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use function App\helpers\flashMessage;

class AcademicYearController extends Controller
{
    public function index()
    {
        $academic_years = AcademicYear::query()
            ->select(['id', 'name', 'slug', 'start_date', 'end_date', 'semester', 'is_active', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Admin/AcademicYear/Index', [
            'page_settings' => [
                'title' => 'Tahun Akademik Dashboard',
                'subtitle' => 'Menampilkan semua daftar tahun akademik'
            ],
            'academic_years' => AcademicYearResource::collection($academic_years)->additional([
                'meta' => [
                    'has_pages' => $academic_years->hasPages(),
                ],
                'state' => [
                    'page' => request()->page ?? 1,
                    'search' => request()->search ?? '',
                    'load' => 10,
                ]
            ])
        ]);
    }

    public function create()
    {
        return inertia('Admin/AcademicYear/Create', [
            'page_settings' => [
                'title' => 'Tambahkan tahun ajaran baru',
                'subtitle' => 'Buat tahun ajaran baru disini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.academic_year.store')
            ],
            'academicYearSemester' => AcademicYers::options(),
        ]);
    }

    public function store(AcademicYearRequest $request): RedirectResponse
    {
        try {
            AcademicYear::create([
                'name' => $request->name,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'semester' => $request->semester,
                'is_active' => $request->is_active,
            ]);
            flashMessage(MessageTypes::CREATED->message('Tahun Ajaran'));
            return to_route('admin.academic_year.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.academic_year.index');
        }
    }

    public function Edit(AcademicYear $academic_year)
    {
        return inertia('Admin/AcademicYear/Edit', [
            'page_settings' => [
                'title' => 'Edit tahun ajaran',
                'subtitle' => 'Silahkan edit tahun ajaran disini',
                'method' => 'PUT',
                'action' => route('admin.academic_year.update', $academic_year)
            ],
            'academic_year' => $academic_year,
            'academicYearSemester' => AcademicYers::options(),
        ]) ;
    }

    public function update(AcademicYear $academic_year, AcademicYearRequest $request): RedirectResponse
    {
        try {
            $academic_year->update([
                'name' => $request->name,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'semester' => $request->semester,
                'is_active' => $request->is_active,
            ]);
            flashMessage(MessageTypes::UPDATED->message('Tahun Ajaran'));
            return to_route('admin.academic_year.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.academic_year.index');
        }
    }

    public function destroy(AcademicYear $academic_year): RedirectResponse
    {
        try {
            $academic_year->delete();
            flashMessage(MessageTypes::DELETED->message('Tahun Ajaran'));
            return to_route('admin.academic_year.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.academic_year.index');
        }
    }
}
