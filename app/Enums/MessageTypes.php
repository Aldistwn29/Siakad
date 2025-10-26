<?php

namespace App\Enums;

enum MessageTypes:string
{
    case CREATED = 'Berhasil menambahkan';
    case UPDATED = 'Berhasil memperbarui';
    case DELETED = 'Berhasil menghapus';
    case ERROR = 'Terjadi kesalahan. Silahkan coba nanti';

    // fungsi untuk mengembalikan error
    public function message(string $entity, ?string $error = null)
    {
        if($this == MessageTypes::ERROR && $error){
            return "{$this->value} {$error}";
        }

        return "{$this->value} {$entity}";
    }
}



