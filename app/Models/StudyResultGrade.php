<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyResultGrade extends Model
{
    protected $fillable = [
        'study_result_id',
        'course_id',
        'grade',
        'weight_of_value',
        'letter',
    ];

    public function studyResult()
    {
        return $this->belongsTo(StudyResult::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
