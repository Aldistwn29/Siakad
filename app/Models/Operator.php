<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Operator extends Model
{
    protected $fillable = [
        'user_id',
        'fakultas_id',
        'departement_id',
        'employee_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function faculty()
    {
        return $this->belongsTo(Fakultas::class, 'fakultas_id');
    }
    public function departemen()
    {
        return $this->belongsTo(Departemen::class, 'departement_id');
    }

    // fungsi untuk filter
    public function scopeFilter(Builder $query, array $filters) : void
    {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->where('employee_number', 'REGEXP', $search)
                ->orWhereHas('user', fn($query) => $query->whereAny(['name', 'email'], 'REGEXP', $search))
                ->orWhereHas('faculty', fn($query) => $query->where('name', 'REGEXP', $search))
                ->orWhereHas('departemen', fn($query) => $query->where('name', 'REGEXP', $search));
        });
    }

    // fungsi untuk sorting
    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use ($sorts){
            match($sorts['field']){
                'fakultas_id' => $query->join('fakultas', 'operators.fakultas_id', '=', 'fakultas.id')
                    ->orderBy('fakultas.name', $sorts['direction']),
                'departement_id' => $query->join('departemens', 'operators.departement_id', '=', 'departemens.id')
                    ->orderBy('departemens.name', $sorts['direction']),
                'name' => $query->join('users', 'operators.user_id', '=', 'users.name')
                    ->orderBy('users.name', $sorts['direction']),
                'email' => $query->join('users', 'operators.user_id', '=', 'users.email')
                    ->orderBy('users.email', $sorts['direction']),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }
}
