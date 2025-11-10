<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Departemen;
use App\Models\Fakultas;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class DashboardAdminController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        return inertia('Admin/Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard Admin',
                'subtitle' => 'Menampilkan semua statistika pada platfrom ini'
            ],
            'count' => [
                'faculties' => Fakultas::count(),
                'departments' => Departemen::count(),
                'classroms' => Kelas::count(),
                'courses' => Course::count(),
            ],
        ]);
    }
}
