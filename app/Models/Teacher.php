<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'user_id',
        'fakultas_id',
        'departement_id',
        'teachers_number',
        'academic_title'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class);
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class);
    }

    // fungsi teacher
    public function scopeFilter(Builder $query, array $filter) : void
    {
        $query->when($filter['search'] ?? null, function($query, $search){
            $query->whereAny([
                'academic_title',
                'teachers_number',
            ], 'REGEXP', $search)
            ->orWhereHas('user', fn($query) => $query->whereAny(['name', 'email'], 'REGEXP', $search))
            ->orWhereHas('faculty', fn($query) => $query->where('id',  $search))
            ->orWhereHas('departemen', fn($query) => $query->where('id',  $search));
        });
    }

    // fungsi sorting
    public function scopeSorting(Builder $query, array $sorts) : void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use ($sorts){
            match ($sorts['field']){
                'fakultas_id' => $query->join('fakultas', 'teachers.fakultas_id', '=', 'fakultas.id')
                    ->orderBy('fakultas.name', $sorts['direction']),
                'departement_id' => $query->join('departemens', 'teachers.departement_id', '=', 'departemens.id')
                    ->orderBy('departemens.name', $sorts['direction']),
                'id' => $query->join('users', 'users.id', '=', 'users.id')
                    ->orderBy('users.id', $sorts['direction']),
                'name' => $query->join('users', 'users.name', '=', 'users.name')
                    ->orderBy('users.name', $sorts['direction']),
                'email' => $query->join('users', 'users.email', '=', 'users.email')
                    ->orderBy('users.email', $sorts['direction']),
                default => $query->orderBy($sorts['field'], $sorts['direction']),
            };
        });
    }

}
