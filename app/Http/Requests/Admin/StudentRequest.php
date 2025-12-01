<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => ['required', 'string', 'email', 'min:3', 'max:255', Rule::unique('users')->ignore($this->student?->user)],
            'password' => Rule::when(
                $this->routeIs('admin.students.store'),
                ['required', 'min:8', 'max:255'],
                ['nullable', 'min:8', 'max:255']
            ),
            'fakultas_id' => ['required', 'exists:fakultas,id'],
            'departement_id' => ['required', 'exists:departemens,id'],
            'fee_group_id' => ['required', 'exists:fee_groups,id'],
            'kelas_id' => ['required', 'exists:kelas,id'],
            'students_number' => ['required', 'max:13'], 
            'semester' => ['required', 'integer'],
            'batch' => ['required', 'integer'],
            'avatar' => ['nullable', 'mimes:png,jpg,jpeg,webp'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama',
            'email' => 'Email',
            'password' => 'Password',
            'fakultas_id' => 'Fakultas',
            'departement_id' => 'Program Studi',
            'fee_group_id' => 'Golongan Ukt',
            'students_number' => 'Nomor Pokok Mahasiswa', 
            'semester' => 'Semester',
            'batch' => 'Angkatan',
            'kelas_id' => 'Kelas',
        ];
    }
}