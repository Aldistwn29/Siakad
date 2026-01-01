<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
        return $this->belongsTo(Fakultas::class, 'fakultas_id', 'id');
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class, 'departemen_id', 'id');
    }
    

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'id');
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
    
    // scope filter
    public function scopeFilter(Builder $query, array $filters) : void
    {
        $query->when($filters['search']  ?? null, function($query, $search){
            $query->whereAny(['name', 'code'], 'REGEXP', $search)
            // mengambil nama teacher dari relasi teacher
            ->orWhereHas('teacher.user', fn($query) => $query->whereAny(['name', 'email'], 'REGEXP', $search))
            // mengambil nama fakultas dari relasi faculty
            ->orWhereHas('faculty', fn($query) => $query->where('name', 'REGEXP', $search))
            // mengambil nama program studi dari relasi teacher
            ->orWhereHas('departemen', fn($query) => $query->where('name', 'REGEXP', $search));
        });
    }

    // scope sorting
    public function scopeSorting(Builder $query, array $sorts) : void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use ($sorts){
            match($sorts['field']){
                'fakultas_id' => $query->join('fakultas', 'corses.fakultas_id', '=', 'fakultas.id')->orderBy('fakultas.name', $sorts['direction']),
                'departemen_id' => $query->join('departemens', 'corses.departemen_id', '=', 'departemens.id')->orderBy('departemens.name', $sorts['direction']),
                'name' => $query
                        ->leftJoin('teachers', 'teachers.id', '=', 'corses.teacher_id')
                        ->leftJoin('users', 'teachers.user_id', '=', 'users.id')
                        ->orderBy('users.name', $sorts['direction']),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }
}
