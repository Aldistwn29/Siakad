<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('study_result_grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('study_result_id')->constrained('study_results')->cascadeOnDelete();
            $table->foreignId('course_id')->constrained('courses')->cascadeOnDelete();

            $table->char('letter', 2);
            $table->decimal('weight_of_value', 5, 2)->default(0);
            $table->decimal('grade', 5, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_result_grades');
    }
};
