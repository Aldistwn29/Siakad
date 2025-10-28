<?php

namespace App\Models;

use App\Enums\StudyPlans;
use Illuminate\Database\Eloquent\Model;

class StudenPlan extends Model
{
    protected $fillable = [
        'student_id',
        'academic_year_id',
        'status',
        'note',
        'semester',
    ];

    protected function casts()
    {
        return [
            'status' => StudyPlans::class,
        ];
    }

    public function students()
    {
       return $this->hasMany(student::class);
    }
    public function academicYears()
    {
       return $this->hasMany(AcademicYear::class);
    }
    public function schedules()
    {
       return $this->belongsToMany(Schedule::class, 'student_plan_schedule')->withTimestamps();
    }
}
