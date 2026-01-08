<?php

namespace App\Http\Requests\Operator;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->hasRole('Operator');
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
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->student?->user?->id)],
            'password' => Rule::when($this->routeIs('operators.students.store'), [
                'required',
                'min:8',
                'max:255'
            ]),
            Rule::when($this->routeIs('operators.students.update'), [
                'nullable',
                'min:8',
                'max:255'
            ]),
            'student_number' => ['required', 'string', 'max:13'],
            'batch' => ['required', 'integer'],
            'avatar' => ['nullable', 'mimes:png,jpg,jpeg,webpg', 'max:2048'],
            'fee_group_id' => ['required', 'exists:fee_groups, id'],
            'kelas_id' => ['required', 'exists:kelas, id'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama',
            'email' => 'Email',
            'password' => 'Kata Sandi',
            'student_number' => 'Nomor Induk Mahasiswa',
            'batch' => 'Angkatan',
            'avatar' => 'Foto Profil',
            'fee_group_id' => 'Kelompok Biaya',
            'kelas_id' => 'Kelas',
        ];
    }
}
