<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FakultasRequest;
use App\Http\Resources\Admin\FakultasResource;
use App\Models\Fakultas;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Inertia;
use Symfony\Component\HttpFoundation\Request;
use Throwable;

use function App\helpers\flashMessage;

class FakultasController extends Controller
{
    use HasFile;
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

    public function create()
    {
        return Inertia('Admin/Fakultas/Create', [
            'page_settings' => [
                'title' => 'Tambahkan Fakultas',
                'subtitle' => 'Buat fakutas baru disini, click simpan dan selesai',
                'method' => 'POST',
                'action' => route('admin.fakultas.store')
            ]
        ]);
    }

    public function store(FakultasRequest $request):RedirectResponse
    {
        try {
            Fakultas::create([
                'name' =>$request->name,
                'code' => str()->random(6),
                'logo' => $this->upload_file($request, 'logo', 'fakultas'),
            ]);
            flashMessage(MessageTypes::CREATED->message('Fakultas'));
            return to_route('admin.fakultas.index');
        } catch (Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.fakultas.index');
        }
    }

    public function edit(Fakultas $fakultas)
    {
        return inertia('Admin/Fakultas/Edit', [
            'page_settings' => [
                'title' => 'Edit Fakultas',
                'subtitle' => 'Silahkan edit fakultas disini',
                'method' => 'PUT',
                'action' => route('admin.fakultas.edit', $fakultas)
            ],
            'fakulties' => $fakultas
        ]);
    }

    public function update(Fakultas $fakultas, FakultasRequest $request):RedirectResponse
    {
        try{
            $fakultas->update([
                'name' => $request->name,
                'logo' => $this->upload_file($request, $fakultas, 'logo', 'fakultas'),
            ]);
            flashMessage(MessageTypes::UPDATED->message('Fakultas'));
            return to_route('admin.fakultas.index');
        } catch(Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.fakultas.index');
        }
    }

    public function destroy(Fakultas $fakultas):RedirectResponse
    {
        try {
            $this->delete_file($fakultas, 'logo');
            $fakultas->delete();
            // message
            flashMessage(MessageTypes::DELETED->message('Fakultas'));
            return to_route('admin.fakultas.index');
        } catch (\Throwable $e) {
            // message
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.fakultas.index');
        }
    }
}
