<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    protected $fillable = [
        'fee_code',
        'student_id',
        'fee_group_id',
        'academic_year_id',
        'semester',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(student::class);
    }

    public function feeGroup()
    {
        return $this->belongsTo(FeeGroup::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    // fungsi untuk search
    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('status', 'REGEXP', $search)
                ->orWhereHas('academicYear', fn ($query) => $query->where('name', 'REGEXP', $search))
                ->orWhereHas('student', fn ($query) => $query->whereAny([
                    'name', 'email',
                ], 'REGEXP', $search));
        });
    }

    // Fungsi untuk Sorting
    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            match ($sorts['field']) {
                'academic_year_id' => $query->join('academic_years', 'fees.academic_year_id', '=', 'academic_years.id')
                    ->orderBy('academic_years.name', $sorts['direction']),
                'name' => $query
                    ->leftJoin('students', 'students.id', '=', 'fees.student_id')
                    ->leftJoin('users', 'students.user_id', '=', 'users.id')
                    ->orderBy('users.name', $sorts['direction']),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }
}
