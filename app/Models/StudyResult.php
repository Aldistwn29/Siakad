<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyResult extends Model
{
    protected $fillable = [
        'student_id',
        'academic_year_id',
        'semester',
        'gpa',
    ];

    public function student()
    {
        return $this->belongsTo(student::class);
    }
    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function grades()
    {
        return $this->hasMany(StudyResultGrade::class);
    }
}
