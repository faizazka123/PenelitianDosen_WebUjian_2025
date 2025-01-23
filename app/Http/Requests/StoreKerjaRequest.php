<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKerjaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        // Hanya izinkan pengguna yang sedang login
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'kodeUjian' => 'required|string|exists:ujians,kodeUjian',
        ];
    }

    public function messages()
    {
        return [
            'kodeUjian.required' => 'Kode Ujian harus diisi.',
            'kodeUjian.exists' => 'Kode Ujian tidak valid.',
        ];
    }
}
