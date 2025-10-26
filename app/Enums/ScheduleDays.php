<?php

namespace App\Enums;

enum ScheduleDays: string
{
    case Senin = 'senin';
    case Selasa = 'selasa';
    case Rabu = 'rabu';
    case Kamis = 'kamis';
    case Jumaat = 'jumaat';
    case Sabtu = 'sabtu';
    case Minggu = 'minggu';

    public static function options()
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $this->value,
            'label' => $this->value
        ])->values()->toArray();
    }
}