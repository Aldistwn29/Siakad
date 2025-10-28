<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'facultas_id',
        'departemen_id',
        'acdemic_year_id'
    ];

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class);
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class);
    }

    public function acdemicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function students()
    {
        return $this->hasMany(student::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function courses()
    {
        return $this->hasManyThrough(
            Course::class,
            Schedule::class,
            'classroom_id',
            'course_id',
            'id',
            'id'
        );
    }
}
