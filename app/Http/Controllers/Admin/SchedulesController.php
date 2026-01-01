<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Enums\ScheduleDays;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ScheduleRequest;
use App\Http\Resources\Admin\ScheduleResource;
use App\Models\Course;
use App\Models\Departemen;
use App\Models\Fakultas;
use App\Models\Kelas;
use App\Models\Schedule;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Throwable;

use function App\helpers\activeAcademicYear;
use function App\helpers\flashMessage;

class SchedulesController extends Controller
{
    public function Index(): Response
    {
        $schedules = Schedule::query()
            ->select(['schedules.id', 'schedules.fakultas_id', 'schedules.departemen_id', 'schedules.course_id', 'schedules.kelas_id',
                'schedules.academic_year_id', 'schedules.start_time', 'schedules.end_time', 'schedules.qoute', 'schedules.day_of_week', 'schedules.created_at'])
            ->with(['faculty', 'departemen', 'course', 'classroom', 'academicYear'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Admin/Schedules/Index', [
            'page_settings' => [
                'title' => 'Halaman dashbord jadwal mata kuliah',
                'subtitle' => 'Halaman utama jadwal mata kuliah univesitas ini',
            ],
            'schedules' => ScheduleResource::collection($schedules)->additional([
                'meta' => [
                    'has_pages' => $schedules->hasPages(),
                ],
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
        return inertia('Admin/Schedules/Create', [
            'page_settings' => [
                'title' => 'Halaman menambahkan jadwal mata kuliah',
                'subtitle' => 'Halaman ini digunakan untuk menambahkan data jadwal mata kuliah di universitas ini. ',
                'method' => 'POST',
                'action' => route('admin.schedules.store'),
            ],
            'faculties' => Fakultas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'departemens' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'courses' => Course::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'clasrooms' => Kelas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'days' => ScheduleDays::options(),
        ]);
    }

    public function store(ScheduleRequest $request): RedirectResponse
    {
        try {
            Schedule::create([
                'fakultas_id' => $request->fakultas_id,
                'departemen_id' => $request->departemen_id,
                'course_id' => $request->course_id,
                'kelas_id' => $request->kelas_id,
                'academic_year_id' => activeAcademicYear()->id,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'day_of_week' => $request->day_of_week,
                'qoute' => $request->qoute,
            ]);
            flashMessage(MessageTypes::CREATED->message('Jadwal'));

            return to_route('admin.schedules.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');

            return to_route('admin.schedules.index');
        }
    }

    public function edit(Schedule $schedule): Response
    {
        return inertia('Admin/Schedules/Edit', [
            'page_settings' => [
                'title' => 'Halaman edit jadwal',
                'subtitle' => 'Halaman ini digunakan untuk mengedit jadwal di universitas ini.',
                'method' => 'PUT',
                'action' => route('admin.schedules.update', $schedule),
            ],
            'schedule' => $schedule,
            'faculties' => Fakultas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'departemens' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'courses' => Course::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'clasrooms' => Kelas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn ($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'days' => ScheduleDays::options(),
        ]);
    }

    public function update(Schedule $schedule, ScheduleRequest $request): RedirectResponse
    {
        try {
            $schedule->update([
                'fakultas_id' => $request->fakultas_id,
                'departemen_id' => $request->departemen_id,
                'course_id' => $request->course_id,
                'kelas_id' => $request->kelas_id,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'day_of_week' => $request->day_of_week,
                'qoute' => $request->qoute,
            ]);
            flashMessage(MessageTypes::UPDATED->message('Jadwal'));

            return to_route('admin.schedules.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');

            return to_route('admin.schedules.index');
        }
    }

    public function destroy(Schedule $schedule): RedirectResponse
    {
        try {
            $schedule->delete();
            flashMessage(MessageTypes::DELETED->message('Jadwal'));

            return to_route('admin.schedules.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');

            return to_route('admin.schedules.index');
        }
    }
}
