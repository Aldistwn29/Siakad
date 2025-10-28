<?php

namespace App\Models;

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

}
