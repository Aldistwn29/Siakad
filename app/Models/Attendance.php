<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'course_id',
        'student_id',
        'classroom_id',
        'status',
        'section'
    ];

    // relasi ke tabel course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // relasi ke tabel student
    public function student()
    {
        return $this->belongsTo(student::class);
    }

    // relasi ke table classroom
    public function classroom()
    {
        return $this->belongsTo(Kelas::class);
    }
}
