<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\TeacherResource;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function index(): Response
    {
        $teachers = Teacher::query()
            ->select('teachers.*')
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['user', 'faculty', 'departemen'])
            ->paginate(request()->load ?? 10);

        return Inertia('Admin/Teachers/Index', [
            'page_settings' => [
                'title' => 'Dashboard Teacher',
                'subtitle' => 'Halaman ini menampilkan data semua teacher yang terdaftar di sistem.'
            ],
            'teachers' => TeacherResource::collection($teachers)->additional([
                'meta' => [
                    'has_pages' => $teachers->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
                'field' => request()->field ?? '',
                'direction' => request()->direction ?? '',
            ],
        ]);
    }
}
