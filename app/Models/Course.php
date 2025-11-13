<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'fakultas_id',
        'departemen_id',
        'academic_year_id',
        'teacher_id',
        'code',
        'name',
        'semester',
        'credit'
    ];

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class);
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function attandances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}
