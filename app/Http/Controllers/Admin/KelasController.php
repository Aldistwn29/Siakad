<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\KelasRequest;
use App\Http\Resources\Admin\KelasResource;
use App\Models\Departemen;
use App\Models\Fakultas;
use App\Models\Kelas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

use function App\helpers\activeAcademicYear;
use function App\helpers\flashMessage;

class KelasController extends Controller
{
    public function index(): Response
    {
        $kelas = Kelas::query()
            ->select(['id', 'name', 'slug', 'facultas_id', 'departemen_id', 'acdemic_year_id', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field','direction']))
            ->with(['faculty', 'departemen', 'acdemicYear'])
            ->paginate(request()->load ?? 10);


        return inertia('Admin/Kelas/Index',[
            'page_settings' => [
                'title' => 'Kelas',
                'subtitle' => 'Menampilkan data semua kelas yang tersedia di universitas ini',
            ],
            'classroms' => KelasResource::collection($kelas)->additional([
                'meta' => [
                    'has_pages' => $kelas->hasPages()
                ],
                'state' => [
                    'page' => request()->page ?? 1,
                    'search' => request()->search ?? '',
                    'load' => 10,
                ]
            ])
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Kelas/Create', [
            'page_settings' => [
                'title' => 'Tambah kelas',
                'subtitle' => 'Halaman ini menampilkan form untuk menambahkan kelas baru',
                'method' => 'POST',
                'action' => route('admin.kelas.store')
            ],
            'fakultas' => Fakultas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'id' => $item->id,
                'value' => $item->id,
                'label' => $item->name
            ]),
            'departemens' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'id' => $item->id,
                'value' => $item->id,
                'label' => $item->name
            ]),
        ]);
    }

    public function store(KelasRequest $request): RedirectResponse
    {
        try {
            Kelas::create([
                'name' => $request->name,
                'facultas_id' => $request->facultas_id,
                'departemen_id' => $request->departemen_id,
                'acdemic_year_id' => activeAcademicYear()->id,
            ]);
            flashMessage(MessageTypes::UPDATED->message('Kelas'));
            return to_route('admin.kelas.index');
        } catch (\Throwable $e) {
             flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.kelas.index');
        }
    }

    public function edit(Kelas $kelas):Response
    {
        return inertia('Admin/Kelas/Edit', [
            'page_settings' => [
                'title' => 'Edit Kelas',
                'subtitle' => 'Halaman ini menampilkan form untuk mengedit kelas',
                'method' => 'PUT',
                'action' => route('admin.kelas.update', $kelas)
            ],
            'kelas' => $kelas,
            'fakultas' => Fakultas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'id' => $item->id,
                'value' => $item->id,
                'label' => $item->name
            ]),
            'departemens' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'id' => $item->id,
                'value' => $item->id,
                'label' => $item->name
            ]),
        ]);
    }

    public function update(Kelas $kelas, KelasRequest $request): RedirectResponse
    {
        try {
            $kelas->update([
                'name' => $request->name,
                'facultas_id' => $request->facultas_id,
                'departemen_id' => $request->departemen_id,
            ]);

            flashMessage(MessageTypes::UPDATED->message('Kelas'));
            return to_route('admin.kelas.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage(), 'error'));
            return to_route('admin.kelas.index');
        }
    }

    public function destroy(Kelas $kelas):RedirectResponse
    {
        try {
            $kelas->delete();
            flashMessage(MessageTypes::DELETED->message('Kelas'));
            return to_route('admin.kelas.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage(), 'error'));
            return to_route('admin.kelas.index');
        }
    }
}
