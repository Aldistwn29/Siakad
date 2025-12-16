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
        return $this->belongsTo(Fakultas::class, 'fakultas_id');
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class, 'departement_id');
    }

    // fungsi teacher
    public function scopeFilter(Builder $query, array $filter) : void
    {
        $query->when(filled($filter['search'] ?? null),
        function($query) use ($filter){
            $search = $filter['search'];
            $query->where(function($q) use ($search){
                $q->where('academic_title', 'LIKE', "%{$search}%")
                    ->orWhere('teachers_number', 'LIKE', "%{$search}%")
                    ->orWhereHas('user', function($q) use ($search){
                        $q->where('name', 'LIKE', "%{$search}%")
                            ->orWhere('email', 'LIKE', "%{$search}%");
                    });
                if(is_numeric($search)){
                    $q->orWhereHas('faculty', fn($q) => $q->where('id', $search))
                        ->orWhereHas('departemen', fn($q) => $q->where('id', $search));
                }
            });
        });
    }

    // fungsi sorting
    public function scopeSorting(Builder $query, array $sorts) : void
    {
        if(empty($sorts['field']) ||empty($sorts['direction'])){
            return;
        }

        match($sorts['field']){
            'fakultas_id' => $query->leftJoin('fakultas', 'teachers.fakultas_id', '=', 'fakultas.id')
                ->select('teachers.*')
                ->orderBy('fakultas.name', $sorts['direction']),
            'departemen_id' => $query->leftJoin('departemens', 'teachers.departement_id', '=', 'departemens.id')
                ->select('teachers.*')
                ->orderBy('departemens.name', $sorts['direction']),
            'name' => $query->leftJoin('users', 'teachers.user_id', '=', 'users.id')
                ->select('teachers.*')
                ->orderBy('users.name', $sorts['direction']),
            'email' => $query->leftJoin('users', 'teachers.user_id', '=', 'users.id')
                ->select('teachers.*')
                ->orderBy('users.email', $sorts['direction']),
            default => $query->orderBy(
                'teachers.'.$sorts['field'],
                $sorts['direction']
            ),
        };
    }
}
