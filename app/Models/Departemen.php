<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Departemen extends Model
{
    use Sluggable;
    protected $fillable = [
        'fakultas_id',
        'name',
        'code',
        'slug'
    ];

    public function sluggable():array
    {
        return[
            'slug' => [
                'source' => 'name'
            ],
        ];
    }


    protected function code(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => strtoupper($value),
            set: fn(string $value) => strtolower($value)
        );
    }

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class, 'fakultas_id', 'id');
    }

    // fungsi untuk scopeFilter
    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereAny([
                'name',
                'code'
            ], 'REGEXP', $search)
                ->orWhereHas('faculty', fn($query) => $query->where('name', 'REGEXP', $search));
        });
    }
    public function scopeSorting(Builder $query, array $sorts): void
    {
        $field = $sorts['field'] ?? null;
        $direction = $sorts['direction'] ?? null;

        if (!$field || !$direction) return;

        if ($field === 'fakultas_id') {
            $query->orderBy(
                Fakultas::select('name')
                    ->whereColumn('fakultas.id', 'departemens.fakultas_id'),
                $direction
            );
        } else {
            $query->orderBy($field, $direction);
        }
    }
}
