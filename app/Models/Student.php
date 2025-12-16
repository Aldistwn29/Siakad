<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'fakultas_id',
        'departement_id',
        'kelas_id',
        'fee_group_id',
        'semester',
        'batch',
        'students_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'fakultas_id');
    }

    public function departement()
    {
        return $this->belongsTo(Departemen::class, 'departement_id');
    }

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }

    public function feeGroup()
    {
        return $this->belongsTo(FeeGroup::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function studyPlans()
    {
        return $this->hasMany(StudenPlan::class);
    }

    public function studyResults()
    {
        return $this->hasMany(StudyResult::class);
    }

    // fungsi filter
    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereAny([
                'students_number',
                'semester',
                'batch'
            ], 'REGEXP', $search)
                ->orWhereHas('user', fn($query) => $query->whereAny(['name', 'email'], 'REGEXP', $search))
                ->orWhereHas('fakultas', fn($query) => $query->where('name', 'REGEXP', $search))
                ->orWhereHas('departement', fn($query) => $query->where('name', 'REGEXP', $search));
        });
    }

    // fungsi untuk sorting
    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            match ($sorts['field']) {
                'faculty_id' => $query->join('fakultas', 'students.fakultas_id', '=', 'fakultas.id')
                    ->orderBy('fakultas.name', $sorts['direction']),
                'departement_id' => $query->join('departemens', 'students.departement_id', '=', 'departemens.id')
                    ->orderBy('departemens.name', $sorts['direction']),
                'name' => $query->join('users', 'students.user_id', '=', 'users.id')
                    ->orderBy('users.name', $sorts['direction']),
                'email' => $query->join('users', 'students.user_id', '=', 'users.id')
                    ->orderBy('users.email', $sorts['direction']),
                'fee_group_id' => $query->join('fee_groups', 'students.fee_group_id', '=', 'fee_groups.id')
                    ->orderBy('fee_groups.group', $sorts['direction']),
                'kelas_id' => $query->join('kelas', 'students.kelas_id', '=', 'kelas.id')
                    ->orderBy('kelas.group', $sorts['direction']),
                default => $query->orderBy($sorts['field'], $sorts['direction'])
            };
        });
    }
}
