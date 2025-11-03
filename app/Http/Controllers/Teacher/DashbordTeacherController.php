<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
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
            ]
        ]);
    }
}
