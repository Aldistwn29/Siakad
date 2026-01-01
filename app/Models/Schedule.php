<?php

namespace App\Models;

use App\Enums\ScheduleDays;
use Illuminate\Database\Eloquent\Builder;
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
        return $this->belongsTo(Fakultas::class, 'fakultas_id', 'id');
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function classroom()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id', 'id');
    }

    public function studyPlans()
    {
        return $this->belongsToMany(StudenPlan::class, 'study_plan_schedules')->withTimestamps();
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereAny([
                'start_time',
                'end_time',
                'day_of_week',
            ], 'REGEXP', $search)
                ->orWhereHas('faculty', fn ($query) => $query->where('name', 'REGEXP', $search))
                ->orWhereHas('departemen', fn ($query) => $query->where('name', 'REGEXP', $search))
                ->orWhereHas('course', fn ($query) => $query->where('name', 'REGEXP', $search))
                ->orWhereHas('classroom', fn ($query) => $query->where('name', 'REGEXP', $search));
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            match ($sorts['field']) {
                'fakultas_id' => $query->join('fakultas', 'schedules.fakultas_id', '=', 'fakultas.id')
                    ->orderBy('fakultas.name', $sorts['direction']),
                'departemen_id' => $query->join('departemens', 'schedules.departemen_id', '=', 'departemens.id')
                    ->orderBy('departemens.name', $sorts['direction']),
                'course_id' => $query->join('courses', 'schedules.course_id', '=', 'courses.id')
                    ->orderBy('courses.name', $sorts['direction']),
                'kelas_id' => $query->join('kelas', 'schedules.kelas_id', '=', 'kelas.id')
                    ->orderBy('kelas.name', $sorts['direction']),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }
}
