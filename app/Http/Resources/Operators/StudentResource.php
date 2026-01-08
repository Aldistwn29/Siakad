<?php

namespace App\Http\Resources\Operators;

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
            'semester' => $this->semester,
            'students_number' => $this->students_number,
            'batch' => $this->batch,
            'created_at' => $this->created_at,
            'user' => $this->whenLoaded('user', [ 
                'id' => $this->user?->id,
                'name' => $this->user?->name,
                'email' => $this->user?->email,
                'avatar' => $this->user?->avatar ? Storage::url($this->user?->avatar) : null, 
            ]),
            'feeGroup' => $this->whenLoaded('feeGroup',[
                 'id' => $this->feeGroup?->id,
                'group' => $this->feeGroup?->group,
            ]),
            'kelas' => $this->whenLoaded('kelas', [
                 'id' => $this->kelas?->id,
                'name' => $this->kelas?->name,
            ]),
        ];
    }
}
