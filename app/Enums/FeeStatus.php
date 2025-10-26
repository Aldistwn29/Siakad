<?php

namespace App\Enums;

enum FeeStatus: string
{
    case PENDING = 'Tertunda';
    case SUKSES = 'Sukses';
    case FAILED = 'Gagal';

    public static function options()
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $this->value,
            'label' => $this->value
        ])->values()->toArray();
    }
}