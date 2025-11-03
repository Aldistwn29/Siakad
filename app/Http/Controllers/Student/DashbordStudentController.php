<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;

class DashbordStudentController extends Controller
{
    
    public function __invoke(Request $request): Response
    {
        return inertia('Student/Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard Student',
                'subtitle' => 'Menampilkan semua statistika pada platfrom ini'
            ]
        ]);
    }
}
