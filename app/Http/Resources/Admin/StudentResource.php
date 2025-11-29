<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'students_number' => $this->students_number,
            'semester' => $this->semester,
            'batch' => $this->batch,
            'created_at' => $this->created_at,
            'user' => $this->whenLoaded('user', [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
                'email' => $this->user?->email,
                'avatar' => $this->user?->avatar ? Storage::url($this->user?->avatar) : null,
            ]), 
            'fakultas' => $this->whenLoaded('fakultas', [
                'id' => $this->fakultas?->id,
                'name' => $this->fakultas?->name,
            ]), 
            'departement' => $this->whenLoaded('departement', [
                'id' => $this->departement?->id,
                'name' => $this->departement?->name,
            ]), 
            'kelas' => $this->whenLoaded('kelas', [
                'id' => $this->kelas?->id,
                'name' => $this->kelas?->name,
            ]), 
            'feeGroup' => $this->whenLoaded('feeGroup', [
                'id' => $this->feeGroup?->id,
                'group' => $this->feeGroup?->group,
                'amount' => $this->feeGroup?->amount,
            ]), 
        ];
    }
}
