<?php

namespace App\Models;

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
        return $this->belongsTo(Fakultas::class);
    }
    public function departemen()
    {
        return $this->belongsTo(Departemen::class);
    }
}
