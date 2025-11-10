<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fakultas extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'code',
        'logo',
        'slug',
    ];

    protected function code(): Attribute
    {
        return Attribute::make(
            get: fn(string $value) => strtoupper($value),
            set: fn(string $value) => strtolower($value)
        );
    }

    public function depertemens()
    {
        return $this->hasMany(Departemen::class);
    }

    public function students()
    {
        return $this->hasMany(student::class);
    }
    
    public function operators()
    {
        return $this->hasMany(Operator::class);
    }
}
