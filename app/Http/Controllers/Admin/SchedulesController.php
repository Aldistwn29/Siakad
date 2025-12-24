<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ScheduleResource;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Response;

class SchedulesController extends Controller
{
    public function Index() : Response
    {
        $schedules = Schedule::query()
            ->select(['schedules.id', 'schedules.fakultas_id', 'schedules.departemen_id', 'schedules.course_id', 'schedules.kelas_id',
                        'schedules.academic_year_id', 'schedules.code', 'schedules.start_date', 'schedules.end_date', 'schedules.day_of_week', 'schedules.created_at'])
            ->with(['faculty', 'departemen', 'course', 'classroom', 'academicYear'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);
        return inertia('Admin/Schedules/Index', [
            'page_settings' => [
                'title' => 'Halaman dashbord jadwal mata kuliah',
                'subtitle' => 'Halaman utama jadwal mata kuliah univesitas ini'
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
}
