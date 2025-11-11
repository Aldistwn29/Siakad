<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FakultasRequest extends FormRequest
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
            'logo' => 
            Rule::when($this->routeIs('admin.fakultas.store'), ['required', 'image', 'mimes:png,jpg', 'max:2048']),
            Rule::when($this->routeIs('admin.fakultas.updated'), ['required', 'image', 'mimes:png,jpg', 'max:2048']),

        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama',
            'logo' => 'Logo',
        ];
    }
}
