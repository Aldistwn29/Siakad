<?php

namespace App\Http\Requests\Admin;

use App\Enums\ScheduleDays;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ScheduleRequest extends FormRequest
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
            'fakultas_id' => ['required', 'exists:fakultas,id'],
            'deaprtemen_id' => ['required', 'exists:departemens,id'],
            'kelas_id' => ['required', 'exists:kelas,id'],
            'course_id' => ['required', 'exists:courses,id'],
            'start_time' => ['required'],
            'end_time' => ['required'],
            'day_of_week' => ['required', new Enum(ScheduleDays::class)],
            'qoute' => ['required', 'integer'],
        ];
    }

    public function attributes()
    {
        return [
            'fakultas_id' => 'Fakultas',
            'departemen_id' => 'Program Studi',
            'kelas_id' => 'Kelas',
            'course_id' => 'Jadwal Mata Kuliah',
            'start_time' => 'Waktu Masuk',
            'end_time' => 'Waktu Keluar',
            'day_of_week' => 'Hari',
            'quote' => 'Kuota',
        ];
    }
}
