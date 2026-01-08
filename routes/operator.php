<?php

use App\Http\Controllers\Operator\DashboardOperatorController;
use App\Http\Controllers\Operator\StudentController;
use Illuminate\Support\Facades\Route;

Route::prefix('operators')->middleware(['auth', 'role:Operator'])->group(function () {
    Route::get('dashbord', DashboardOperatorController::class)->name('operators.dashbord');
});
Route::controller(StudentController::class)->group(function(){
    Route::get('operators', 'index')->name('operators.students.index');
    Route::get('operators/create', 'create')->name('operators.students.create');
    Route::post('operators/create', 'store')->name('operators.students.store');
    Route::get('operators/edit/{student::students_number}', 'edit')->name('operators.students.edit');
    Route::put('operators/edit/{student::students_number}', 'update')->name('operators.students.update');
    Route::delete('operators/destroy/{student::students_number}', 'destroy')->name('operators.students.destroy');
});
