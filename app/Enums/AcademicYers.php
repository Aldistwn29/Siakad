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
            'value' => $item->value,
            'label' => $item->value
        ])->values()->toArray();
    }
}