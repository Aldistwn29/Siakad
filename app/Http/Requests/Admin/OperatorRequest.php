<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OperatorRequest extends FormRequest
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
            'name' => ['required', 'min:3', 'max:255', 'string'],
            'email' => ['required', 'min:3', 'max:255', 'string', Rule::unique('users')->ignore($this->operator?->user)],
            'password' => [
                Rule::when($this->routeIs('admin.operators.store'), ['required', 'min:8', 'max:255']),
                Rule::when($this->routeIs('admin.operators.update'), ['nullable', 'min:8', 'max:255'])
            ],
            'avatar' => ['nullable', 'mimes:jpg,png,webp', 'max:2048'],
            'fakultas_id' => ['required', 'exists:fakultas,id'],
            'departement_id' => ['required', 'exists:departemens,id'],
            'employee_number' => ['required', 'string', 'max:10'],
        ];
    }

    public function attributes()
    {
        return[
            'name' => 'Nama',
            'email' => 'Email',
            'password' => 'Password',
            'avatar' => 'Avatar',
            'fakultas_id' => 'Fakultas',
            'departement_id' => 'Program Studi',
            'employee_number' => 'Nomer Induk Karyawan',
        ];
    }
}
