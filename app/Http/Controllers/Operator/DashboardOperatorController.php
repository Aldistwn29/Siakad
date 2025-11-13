<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Kelas;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardOperatorController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return inertia('Operator/Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard Operator',
                'subtitle' => 'Menampilkan semua statistika pada platfrom ini'
            ],
            'count' => [
            'students' => Student::query()
                    ->where('fakultas_id', auth()->user()->operator->fakultas_id)
                    ->where('departement_id', auth()->user()->operator->departement_id)->count(),
            'teachers' => Teacher::query()
                    ->where('fakultas_id', auth()->user()->operator->fakultas_id)
                    ->where('departement_id', auth()->user()->operator->departement_id)->count(),
            'classroms' => Kelas::query()
                        ->where('facultas_id', auth()->user()->operator->facultas_id)
                        ->where('departemen_id', auth()->user()->operator->departemen_id)->count(),
            'courses' => Course::query()
                        ->where('fakultas_id', auth()->user()->operator->fakultas_id)
                        ->where('departemen_id', auth()->user()->operator->departemen_id)->count(),
            ],
        ]);
    }
}
