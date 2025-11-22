<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Http\Resources\Admin\RoleResource;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\RedirectResponse;

use function App\helpers\flashMessage;

class RoleController extends Controller
{
    public function index():Response
    {
        $roles = Role::query()
            ->select(['id', 'name', 'guard_name', 'created_at'])
            ->when(request()->search, function($query, $search){
                $query->whereAny([
                    'name',
                    'guard_name',
                ], 'REGEXP', $search);
            })
            ->when(request()->field && request()->direction, 
            fn($query) => $query->orderBy(request()->field, request()->direction))
            ->paginate(request()->load ?? 10);
            
        return inertia('Admin/Role/Index', [
            'page_settings' => [
                'title' => 'Peran',
                'subtitle' => 'Halaman ini menampilkan Peran pada universitas ini',
            ],
            'roles' => RoleResource::collection($roles)->additional([
                'meta' => [
                    'has_pages' => $roles->hasPages(),
                ],
            ]),
            'has_pages' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function create():Response
    {
        return inertia('Admin/Role/Create', [
            'page_settings' => [
                'title' => 'Tambahkan Peran baru',
                'subtitle' => 'Halaman ini menampilkan form untuk menambahkan Peran baru',
                'method' => 'POST',
                'action' => route('admin.roles.store')
            ]
        ]);
    }

    public function store(RoleRequest $request):RedirectResponse
    {
        try {
            Role::create([
                'name' => $request->name,
                'guard_name' => 'web',
            ]);
            flashMessage(MessageTypes::CREATED->message('Peran'));
            return to_route('admin.roles.index');
        } catch (\Throwable $e) {
             flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.roles.index');
        }
    }

    public function edit(Role $role):Response
    {
        return inertia('Admin/Role/Edit', [
            'page_settings' => [
                'title' => 'Tambahkan Peran baru',
                'subtitle' => 'Halaman ini menampilkan form untuk menambahkan Peran baru',
                'method' => 'PUT',
                'action' => route('admin.roles.update', $role)
            ],
            'role' => $role,
        ]);
    }

    public function update(Role $role, RoleRequest $request):RedirectResponse
    {
        try {
            $role->update([
                'name' => $request->name,
            ]);
            flashMessage(MessageTypes::UPDATED->message('Peran'));
            return to_route('admin.roles.index');
        } catch (\Throwable $e) {
             flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.roles.index');
        }
    }

    public function destroy(Role $role) : RedirectResponse
    {
        try {
            $role->delete();
            flashMessage(MessageTypes::DELETED->message('Peran'));
            return to_route('admin.roles.index');
        } catch (\Throwable $e) {
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.roles.index');
        }
    }
}
