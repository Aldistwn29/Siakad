<?php

namespace App\Http\Requests\Admin;

use App\Enums\AcademicYers;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class AcademicYearRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->hasRole('Admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'semester' => ['required', new Enum(AcademicYers::class)],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama',
            'start_date' => 'Tanggal Mulai',
            'end_date' => 'Tanggal berakhir',
            'semester' => 'Semester',
            'is_active' => 'Apakah Aktif'
        ];
    }
}
