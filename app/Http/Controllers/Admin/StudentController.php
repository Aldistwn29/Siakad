<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StudentRequest;
use App\Http\Resources\Admin\StudentResource;
use App\Models\Departemen;
use App\Models\Fakultas;
use App\Models\FeeGroup;
use App\Models\Kelas;
use App\Models\Student;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

use function App\helpers\flashMessage;

class StudentController extends Controller
{
    use HasFile;
    public function index() : Response
    {
        $students = Student::query()
        ->select(['students.id', 'students.user_id', 'students.fakultas_id', 'students.departement_id', 'students.kelas_id', 
            'students.students_number', 'students.fee_group_id', 'students.batch', 'students.semester', 'students.created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field', 'direction']))
        ->with(['user', 'fakultas', 'departement', 'kelas', 'feeGroup'])
        ->whereHas('user', function($query){
            $query->whereHas('roles', fn($query) => $query->where('name', 'student'));
        })
        ->paginate(request()->load ?? 10);
        
        return inertia('Admin/Student/Index',[
            'page_settings' => [
                'title' => 'Mahasiswa',
                'subtitle' => 'Ini halaman untuk daftar mahasiswa'
            ],
            'students' => StudentResource::collection($students)->additional([
                'meta' => [
                    'has_pages' => $students->hasPages()
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
        return inertia('Admin/Student/Create',[
            'page_settings' => [
                'title' => 'Tambahkan Mahasiswa',
                'subtitle' => 'Buat dan tambahkan mahasiswa baru di sini!.',
                'method' => 'POST',
                'action' => route('admin.students.store'),
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
                'departements' => Departemen::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) =>[
                    'id' => $item->id,
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
                'feeGroups' => FeeGroup::query()->select(['id', 'group', 'amount'])->orderBy('group')->get()->map(fn($item)=>[
                    'id' => $item->id,
                    'value' => $item->id,
                    'label' => 'Golongan Ukt ' . $item->group . ' - ' . number_format($item->amount, 0, ',', '.')
                ]),
                'classroms' => Kelas::query()->select(['id', 'name'])->orderBy('name')->get()->map(fn($item) =>[
                    'id' => $item->id,
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ]);
    }

    public function store(StudentRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'avatar' => $this->upload_file($request, 'avatar', 'users')
            ]);

            $user->student()->create([
                'fakultas_id' => $request->fakultas_id,
                'departement_id' => $request->departement_id,
                'kelas_id' => $request->kelas_id,
                'fee_group_id' => $request->fee_group_id,
                'students_number' => $request->students_number,
                'semester' => $request->semester,
                'batch' => $request->batch,
            ]);
            // defind default role
            $user->assignRole('Student');
            DB::commit();
            // defind message
            flashMessage(MessageTypes::CREATED->message('Mahasiswa'));
            return to_route('admin.students.index');
        } catch (\Throwable $e) {
            DB::rollBack();
            flashMessage(MessageTypes::ERROR->message($e->getMessage()), 'error');
            return to_route('admin.students.index');
        }
    }
}
