<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\FakultasResource;
use App\Models\Fakultas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FakultasController extends Controller
{
    public function index()
    {
        $fakultas = Fakultas::query()
            ->select(['id', 'name', 'code', 'slug', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return Inertia('Admin/Fakultas/Index', [
            'page_settings' => [
                'title' => 'Fakultas',
                'subtitle' => 'Menampilkan semua data fakultas yang tersedia pada universitas',
            ],
            'fakulties' => FakultasResource::collection($fakultas)->additional([
                'meta' => [
                    'has_pages' => $fakultas->hasPages(),
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
