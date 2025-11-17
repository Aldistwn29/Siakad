<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DepartemenRequest;
use App\Http\Resources\Admin\DepartemenResource;
use App\Models\Departemen;
use App\Models\Fakultas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

use function App\helpers\flashMessage;

class DepartementController extends Controller
{
    public function index()
    {
        $departements = Departemen::query()
            ->select(['id', 'fakultas_id', 'name', 'code', 'slug', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with('faculty')
            ->paginate(request()->load ?? 10);


        return inertia('Admin/Departemen/Index', [
            'page_settings' => [
                'title' => 'Program Studi Dashboard',
                'subtitle' => 'Menampilkan semua daftar progrma studi'
            ],
            'departements' => DepartemenResource::collection($departements)->additional([
                'meta' => [
                   'has_pages' => $departements->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function create()
    {
        return inertia('Admin/Departemen/Create', [
            'page_settings' => [
                'title' => 'Tambahkan program studi baru',
                'subtitle' => 'Buat program studi baru disini, click simpan dan selesai',
                'method' => 'POST',
                'action' => route('admin.departemen.create')
            ],
            'faculties' => Fakultas::query()
                ->select(['id', 'name'])
                ->orderBy('name')
                ->get()
                ->map(fn($item) => [
                    'id' => $item->id,
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
        ]);
    }

    public function store(DepartemenRequest $request): RedirectResponse
    {
        try {
            Departemen::create([
                'fakultas_id' => $request->fakultas_id,
                'name' => $request->name,
                'code' => str()->random(6),
            ]);

            flashMessage(MessageTypes::CREATED->message('Program studi'));
            return to_route('admin.departemen.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.departemen.index');
        }
    }
}
