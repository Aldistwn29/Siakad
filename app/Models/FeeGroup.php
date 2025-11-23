<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class FeeGroup extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'group',
        'amount'
    ];

    public function scopeFilter(Builder $query, Array $search): void
    {
        $query->when($search['search'] ?? null, function($query, $search){
            $query->whereAny(['group', 'amount'], 'REGEXP', $search);
        });
    }

    public function scopeSorting(Builder $query, Array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use($sorts){
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }
}
