<?php

namespace App\Models;

use App\Enums\ScheduleDays;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'fakultas_id',
        'departemen_id',
        'course_id',
        'kelas_id',
        'academic_year_id',
        'start_time',
        'end_time',
        'day_of_week',
        'qoute',
    ];

    protected function casts()
    {
        return [
            'day_of_week' => ScheduleDays::class,
        ];
    }

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class);
    }
    public function departemen()
    {
        return $this->belongsTo(Departemen::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }
    public function classroom()
    {
        return $this->belongsTo(Kelas::class);
    }

    public function studyPlans()
    {
        return $this->belongsToMany(StudenPlan::class, 'study_plan_schedules')->withTimestamps();
    }

}
