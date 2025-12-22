<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Fakultas extends Model
{
    use HasFactory, Sluggable;
    protected $fillable = [
        'name',
        'code',
        'logo',
        'slug',
    ];

    // slugable
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

    public function depertemens()
    {
        return $this->hasMany(Departemen::class, 'fakultas_id', 'id');
    }

    public function students()
    {
        return $this->hasMany(student::class);
    }

    public function operators()
    {
        return $this->hasMany(Operator::class, 'fakultas_id', 'id');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
       if(empty($filters['search'])){
        return;
       }

       $search = trim($filters['search']);
       $query->where(function (Builder $q) use ($search) {
        $q->where('name', 'LIKE', "%{$search}%")
            ->orWhere('code', 'LIKE', "%{$search}%");
       });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction'] ?? 'asc');
        });
    }
}
