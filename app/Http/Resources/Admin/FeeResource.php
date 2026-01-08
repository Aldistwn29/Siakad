<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeeResource extends JsonResource
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
            'status' => $this->status,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'student_id' => $this->whenloaded('student', [
                'id' => $this->id,
                'name' => $this->name,
                'students_number' => $this->student?->students_number,
                'name' => $this->student?->name,
                'fakultas_id' => $this->student?->fakultas_id,
                'departement_id' => $this->student?->departement_id,
                'kelas_id' => $this->student?->kelas_id,
            ]),
            'fee_group_id' => $this->whenloaded('feeGroup', [
                'id' => $this->feeGroup?->id,
                'amount' => $this->feeGroup?->amount,
            ]),
        ];
    }
}
