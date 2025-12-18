<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\OperatorRequest;
use App\Http\Resources\Admin\OperatorResource;
use App\Models\Departemen;
use App\Models\Fakultas;
use App\Models\Operator;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;
use ParaTest\JUnit\MessageType;
use Throwable;

use function App\helpers\flashMessage;

class OperatorController extends Controller
{
    use HasFile;
    public function index(): Response
    {
        $operators = Operator::query()
            ->select(['operators.id', 'operators.user_id','operators.fakultas_id', 'operators.departement_id', 'operators.employee_number', 'operators.created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field','direction']))
            ->whereHas('user', function($query){
                $query->whereHas('roles',fn($query) => 
                $query->where('name', 'Operator'));
            })
            ->with(['user', 'faculty', 'departemen'])
            ->paginate(request()->load ?? 10);

        return inertia('Admin/Operators/Index',[
            'page_settings' => [
                'title' => 'Halaman Dashboard Operator',
                'subtitle' => 'Halaman ini menampilkan data-data operator di universitas.'
            ],
            'operators' => OperatorResource::collection($operators)->additional([
                'meta' => [
                    'has_pages' => $operators->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Operators/Create', [
            'page_settings' => [
                'title' => 'Tambah Operator',
                'subtitle'=> 'Halaman ini digunakan untuk menambahkan data operator',
                'method' => 'POST',
                'action' => route('admin.operators.store')
            ],
            'faculties' => Fakultas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
            'departements' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) => [
                'value' => $item->id,
                'label' => $item->name,
            ]),
        ]);
    }

    public function store(OperatorRequest $request): RedirectResponse
    {
        //  dd($request->all());
        try {
            // mulai transiction data
            DB::beginTransaction();
            // validasi data
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'avatar' => $this->upload_file($request, 'avatar', 'users'),
            ]);
            // validasi data user ke relasi operator
            $user->operator()->create([
                'fakultas_id' => $request->fakultas_id,
                'departement_id' => $request->departement_id,
                'employee_number' => $request->employee_number
            ]);
            // assign sebgai role Operator
            $user->assignRole('Operator');
            // commit data
            DB::commit();
            flashMessage(MessageTypes::CREATED->message('Operator'));
            return to_route('admin.operators.index');
        } catch (Throwable $e) {
            // rollback ketika gagal
            DB::rollBack();
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.operators.index');
        }
    }
}
