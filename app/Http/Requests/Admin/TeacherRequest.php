<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TeacherRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->teacher?->user)],
            'password' => [
                        Rule::when($this->routeIs('admin.teachers.store'), ['required', 'string', 'min:8', 'max:255']),
                        Rule::when($this->routeIs('admin.teachers.update'), ['nullable', 'string', 'min:8', 'max:255']),
                    ],
            Rule::when($this->routeIs('admin.teachers.update'), [
                'nullable', 'min:8', 'max:255'
            ]),
            'fakultas_id' => ['required', 'exists:fakultas,id'],
            'departement_id' => ['required', 'exists:departemens,id'],
            'teachers_number' => ['required', 'string', 'max:50'],
            'academic_title' => ['required', 'string', 'min:2', 'max:255'],
            'avatar' => ['nullable', 'mimes:png,jpg,jpeg,webp', 'max:2048'],
        ];
    }

    public function attributes(): array
    {
        return[
            'name' => 'Nama',
            'email' => 'Email',
            'password' => 'Password',
            'fakultas_id' => 'Fakultas',
            'departement_id' => 'Departemen',
            'teachers_number' => 'Nomer Induk Dosen',
            'academic_title' => 'Gelar Akademik',
            'avatar' => 'Avatar',
        ];
    }
}
