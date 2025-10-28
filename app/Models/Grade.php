<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    protected $fillable = [
        'student_id',
        'classroom_id',
        'course_id',
        'grade',
        'section',
        'category'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function student()
    {
        return $this->belongsTo(student::class);
    }
    public function classroom()
    {
        return $this->belongsTo(Kelas::class);
    }
}
