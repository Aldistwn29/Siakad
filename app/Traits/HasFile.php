<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HasFile
{
    /**
     * Upload a file with validation
     * 
     * @param Request $request
     * @param string $column
     * @param string $folder
     * @param int $maxSizeKb Maximum file size in KB (default 5MB)
     * @return string|null
     */
    public function upload_file(Request $request, string $column, string $folder, int $maxSizeKb = 5120): ?string
    {
        if (!$request->hasFile($column)) {
            return null;
        }

        // Validate file size
        $request->validate([
            $column => "file|max:{$maxSizeKb}"
        ]);

        return $request->file($column)->store($folder);
    }

    /**
     * Update file with validation
     * 
     * @param Request $request
     * @param Model $model
     * @param string $column
     * @param string $folder
     * @param int $maxSizeKb Maximum file size in KB (default 5MB)
     * @return string|null
     */
    public function update_file(Request $request, Model $model, string $column, string $folder, int $maxSizeKb = 5120): ?string
    {
        // Delete old file
        $this->delete_file($model, $column);
        
        if ($request->hasFile($column)) {
            // Validate file size
            $request->validate([
                $column => "file|max:{$maxSizeKb}"
            ]);
            
            $thumbnail = $request->file($column)->store($folder);
        } else {
            $thumbnail = $model->$column;
        }

        return $thumbnail;
    }

    /**
     * Delete a file
     * 
     * @param Model $model
     * @param string $column
     * @return void
     */
    public function delete_file(Model $model, string $column): void
    {
        if ($model->$column) {
            Storage::delete($model->$column);
        }
    }
}
