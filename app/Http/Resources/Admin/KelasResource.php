<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KelasResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'created_at' => $this->created_at,
            'facultas_id' => $this->whenLoaded('faculty', [
                'id' => $this->faculty?->id,
                'name' => $this->faculty?->name
            ]),
            'departemen_id' => $this->whenLoaded('departemen', [
                'id' => $this->departemen?->id,
                'name' => $this->departemen?->name
            ]),
            'acdemic_year_id' => $this->whenLoaded('acdemicYear', [
                'id' => $this->acdemicYear?->id,
                'name' => $this->acdemicYear?->name
            ]),
        ];
    }
}
