<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DepartemenRequest extends FormRequest
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
            'fakultas_id' => [
                'required',
                'exists:fakultas,id'
            ],
            'name' => [
                'required',
                'string',
                'min:3',
                'max:255',
            ],
        ];
    }

    public function attributes()
    {
        return [
            'fakultas_id' => 'Fakultas',
            'name' => 'Name'
        ];
    }
}
