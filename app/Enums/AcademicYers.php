<?php

namespace App\Enums;


enum AcademicYers: string
{
    case ODO = 'ganjil';
    case EVEN = 'genap';

    // fungsi opsion
    public static function options()
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $this->value,
            'label' => $this->value
        ])->values()->toArray();
    }
}