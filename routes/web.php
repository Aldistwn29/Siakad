<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function(){
    if(auth()->check()){
        return redirect()->route('dashboard');
    }else {
        return redirect()->route('login');
    }
});
Route::get('/dashboard', function () {
    if (auth()->user()->hasRole('Admin')) {
            return redirect()->route('admin.dashbord');
        }
        if (auth()->user()->hasRole('Operator')) {
            return redirect()->route('operators.dashbord');
        }
        if (auth()->user()->hasRole('Teacher')) {
            return redirect()->route('teachers.dashbord');
        }
        if (auth()->user()->hasRole('Student')) {
            return redirect()->route('students.dashbord');
        }else{
            abort(404);
        }

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
require __DIR__.'/operator.php';
require __DIR__.'/teacher.php';
require __DIR__.'/student.php';
