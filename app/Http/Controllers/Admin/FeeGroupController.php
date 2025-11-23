<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FeeGroupRequest;
use App\Http\Resources\Admin\FeeGroupResource;
use App\Models\FeeGroup;
use Illuminate\Http\Request;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

use function App\helpers\flashMessage;

class FeeGroupController extends Controller
{
    public function index(): Response
    {
        $feeGroups = FeeGroup::query()
            ->select(['id', 'group', 'amount', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Admin/FeeGroup/Index', [
            'page_settings' => [
                'title' => 'Golongan UKT',
                'subtitle' => 'Halaman ini menampilkan Golongan UKT pada universitas ini'
            ],

            'feeGroups' => FeeGroupResource::collection($feeGroups)->additional([
                'meta' => [
                    'has_pages' => $feeGroups->hasPages()
                ],
                'state' => [
                    'page' => request()->page ?? 1,
                    'search' => request()->search,
                    'load' => 10
                ],
            ]),
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/FeeGroup/Create', [
            'page_settings' => [
                'title' => 'Tambahkan golongan ukt',
                'subtitle' => 'Halaman untuk menambahkan golongan ukt baru',
                'method' => 'POST',
                'action' => route('admin.fee-groups.store'),
            ],
        ]);
    }

    public function store(FeeGroupRequest $request): RedirectResponse
    {
        try {
            FeeGroup::create([
                'group' => $request->group,
                'amount' => $request->amount
            ]);

            // falsh message untuk menampilkan pesan sukses
            flashMessage(MessageTypes::CREATED->message('Golongan'));
            return to_route('admin.fee-groups.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.fee-groups.index');
        }
    }

    public function edit(FeeGroup $feeGroup): Response
    {
        return inertia('Admin/FeeGroup/Edit', [
            'page_settings' => [
                'title' => 'Edit golongan ukt',
                'subtitle' => 'Halaman untuk edit golongan ukt baru',
                'method' => 'PUT',
                'action' => route('admin.fee-groups.update', $feeGroup),
            ],
            'feeGroup' => $feeGroup,
        ]);
    }

    public function update(FeeGroup $feeGroup, FeeGroupRequest $request): RedirectResponse
    {
        try {
            $feeGroup->update([
                'group' => $request->group,
                'amount' => $request->amount
            ]);

            // falsh message untuk menampilkan pesan sukses
            flashMessage(MessageTypes::UPDATED->message('Golongan'));
            return to_route('admin.fee-groups.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.fee-groups.index');
        }
    }

    public function destroy(FeeGroup $feeGroup): RedirectResponse
    {
        try {
            $feeGroup->delete();
            // falsh message untuk menampilkan pesan sukses
            flashMessage(MessageTypes::DELETED->message('Golongan'));
            return to_route('admin.fee-groups.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.fee-groups.index');
        }
    }
}
