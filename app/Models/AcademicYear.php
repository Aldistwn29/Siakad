<?php

namespace App\Models;

use App\Enums\AcademicYers;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class AcademicYear extends Model
{
    use Sluggable;
    protected $fillable = [
        'name',
        'slug',
        'start_date',
        'end_date',
        'semester',
        'is_active',
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    
    protected function casts(): array
    {
        return [
            'semester' => AcademicYers::class
        ];
    }


    // filter search
    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->whereAny([
                'name',
                'semester',
            ], 'REGEXP', $search);
        });
    }

    public function scopeSorting(Builder $query, Array $sorts)
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use($sorts){
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }
}
