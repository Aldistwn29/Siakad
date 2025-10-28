<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Departemen extends Model
{
    protected $fillable = [
        'fakultas_id',
        'name',
        'code',
        'slug'
    ];

    protected function code(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => strtoupper($value),
            set: fn(string $value) => strtolower($value)
        );
    }

    public function faculty()
    {
        return $this->belongsTo(Fakultas::class);
    }
}
