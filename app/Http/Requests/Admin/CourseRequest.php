<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
            'departemen_id' => ['required', 'exists:departemens,id'],
            'teacher_id' => ['required', 'exists:users,id'],
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'credit' => ['required', 'integer'],
            'semester' => ['required', 'integer'],
        ];
    }

    public function attributes()
    {
        return [
            'fakultas_id' => 'Fakultas',
            'departemen_id' => 'Program studi',
            'teacher_id' => 'Dosen',
            'name' => 'Mata kuliah',
            'credit' => 'Satuan Credit Semester (SKS)',
            'semester' => 'Semester',
        ];
    }
}
