<?php

namespace App\Models;

use App\Enums\StudyPlans;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'fakultas_id',
        'departement_id',
        'kelas_id',
        'fee_group_id',
        'semester',
        'batch',
        'students_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class);
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function feeGroup()
    {
        return $this->belongsTo(FeeGroup::class);
    }

    public function attendances()
    {
       return $this->hasMany(Attendance::class);
    }

    public function grades()
    {
       return $this->hasMany(Grade::class);
    }

    public function studyPlans()
    {
       return $this->hasMany(StudyPlans::class);
    }

    public function studyResults()
    {
       return $this->hasMany(StudyResult::class);
    }
}
