<?php

namespace App\Http\Controllers\Student;

use App\Enums\FeeStatus;
use App\Enums\StudyPlansStatus;
use App\Http\Controllers\Controller;
use App\Models\Fee;
use App\Models\StudenPlan;
use Illuminate\Http\Request;
use Inertia\Response;

class DashbordStudentController extends Controller
{

    public function __invoke(Request $request): Response
    {
        return inertia('Student/Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard',
                'subtitle' => 'Menampilkan semua statistika pada platfrom ini'
            ],
            'count' => [
                'study_plans_approved' => StudenPlan::query()->where('status', StudyPlansStatus::APPROVED->value)->count(),
                'study_plans_rejected' => StudenPlan::query()->where('status', StudyPlansStatus::PENDING->value)->count(),
                'total_payments' => Fee::query()
                    ->where('student_id', auth()->user()->student->id)
                    ->where('status', FeeStatus::SUKSES->value)
                    ->with('feeGroup')
                    ->get()
                    ->sum(function ($fee) {
                        $fee->feeGroup->amout;
                    }),
            ],
        ]);
    }
}
