<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Kelas extends Model
{
    use Sluggable;
    protected $fillable = [
        'name',
        'slug',
        'facultas_id',
        'departemen_id',
        'acdemic_year_id'
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ],
        ];
    }

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class, 'facultas_id');
    }

    public function departemen()
    {
        return $this->belongsTo(Departemen::class, 'departemen_id');
    }

    public function acdemicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'acdemic_year_id');
    }

    public function students()
    {
        return $this->hasMany(student::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function courses()
    {
        return $this->hasManyThrough(
            Course::class,
            Schedule::class,
            'classroom_id',
            'course_id',
            'id',
            'id'
        );
    }

    // function filter
    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'REGEXP', $search);
        });
    }
    // function search
    public function scopeSorting(Builder $query, array $sorts)
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }
}
