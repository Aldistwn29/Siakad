<?php


use App\Http\Controllers\Student\DashbordStudentController;
use Illuminate\Support\Facades\Route;

Route::prefix('students')->middleware(['auth', 'role:Student'])->group(function () {
    Route::get('dashbord', DashbordStudentController::class)->name('students.dashbord');
});