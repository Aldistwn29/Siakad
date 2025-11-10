<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Kelas;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Response;

class DashbordTeacherController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return inertia('Teacher/Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard Teacher',
                'subtitle' => 'Menampilkan semua statistika pada platfrom ini'
            ],
            'count' => [
                'courses' => Course::query()->where('teacher_id', auth()->user()->teacher->id)->count(),
                'classroms' => Kelas::whereHas('schedules.course', function($query){
                    $query->where('teacher_id', auth()->user()->teacher->id);
                })->count(),
                'schedules' => Schedule::query()->whereHas('course', function($query){
                    $query->where('teacher_id', auth()->user()->teacher->id);
                })->count(),
            ],
        ]);
    }
}
