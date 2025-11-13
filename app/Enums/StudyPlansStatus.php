<?php

namespace App\Enums;

enum StudyPlansStatus: string
{
    case PENDING = 'pending';
    case  APPROVED = 'approved';
    case REJECTED = 'reject';

    public static function options()
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $this->value,
            'label' => $this->value
        ])->values()->toArray();
    }
}
