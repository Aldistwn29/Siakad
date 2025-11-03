<?php

use App\Http\Controllers\Teacher\DashbordTeacherController;
use Illuminate\Support\Facades\Route;

Route::prefix('teachers')->group(function () {
    Route::get('dashbord', DashbordTeacherController::class)->name('teachers.dashbord');
});