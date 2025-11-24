<?php

use App\Http\Controllers\Admin\AcademicYearController;
use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\DepartementController;
use App\Http\Controllers\Admin\FakultasController;
use App\Http\Controllers\Admin\FeeGroupController;
use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\StudentController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware(['auth', 'role:Admin'])->group(function () {
    Route::get('dashbord', DashboardAdminController::class)->name('admin.dashbord');

    // Fitur fakultas di admin
    Route::controller(FakultasController::class)->group(function () {
        // routes
        Route::get('fakultas', 'index')->name('admin.fakultas.index');
        Route::get('fakultas/create', 'create')->name('admin.fakultas.create');
        Route::post('fakultas/create', 'store')->name('admin.fakultas.store');
        Route::get('fakultas/edit/{fakultas:slug}', 'edit')->name('admin.fakultas.edit');
        Route::put('fakultas/edit/{fakultas:slug}', 'update')->name('admin.fakultas.update');
        Route::delete('fakultas/delete/{fakultas:slug}', 'destroy')->name('admin.fakultas.destroy');
    });
    // Fitur departemen di admin
    Route::controller(DepartementController::class)->group(function () {
        // routes
        Route::get('departemen', 'index')->name('admin.departemen.index');
        Route::get('departemen/create', 'create')->name('admin.departemen.create');
        Route::post('departemen/create', 'store')->name('admin.departemen.store');
        Route::get('departemen/edit/{departemen:slug}', 'edit')->name('admin.departemen.edit');
        Route::put('departemen/edit/{departemen:slug}', 'update')->name('admin.departemen.update');
        Route::delete('departemen/delete/{departemen:slug}', 'destroy')->name('admin.departemen.destroy');
    });
    // fitur akademik year
    Route::controller(AcademicYearController::class)->group(function () {
        Route::get('academic_year', 'index')->name('admin.academic_year.index');
        Route::get('academic_year/create', 'create')->name('admin.academic_year.create');
        Route::post('academic_year/create', 'store')->name('admin.academic_year.store');
        Route::get('academic_year/edit/{academic_year:slug}', 'edit')->name('admin.academic_year.edit');
        Route::put('academic_year/edit/{academic_year:slug}', 'update')->name('admin.academic_year.update');
        Route::delete('academic_year/delete/{academic_year:slug}', 'destroy')->name('admin.academic_year.destroy');
    });

    // route kelas
    Route::controller(KelasController::class)->group(function(){
        Route::get('kelas', 'index')->name('admin.kelas.index');
        Route::get('kelas/create', 'create')->name('admin.kelas.create');
        Route::post('kelas/create', 'store')->name('admin.kelas.store');
        Route::get('kelas/edit/{kelas:slug}', 'edit')->name('admin.kelas.edit');
        Route::put('kelas/edit/{kelas:slug}', 'update')->name('admin.kelas.update');
        Route::delete('kelas/delete/{kelas:slug}', 'destroy')->name('admin.kelas.destroy');
    });

    // Route Role
    Route::controller(RoleController::class)->group(function(){
        Route::get('roles', 'index')->name('admin.roles.index');
        Route::get('roles/create', 'create')->name('admin.roles.create');
        Route::post('roles/create', 'store')->name('admin.roles.store');
        Route::get('roles/edit/{role}', 'edit')->name('admin.roles.edit');
        Route::put('roles/edit/{role}', 'update')->name('admin.roles.update');
        Route::delete('roles/delete/{role}', 'destroy')->name('admin.roles.destroy');
    });

    // Route golongan ukt
    Route::controller(FeeGroupController::class)->group(function(){
        Route::get('fee-groups', 'index')->name('admin.fee-groups.index');
        Route::get('fee-groups/create', 'create')->name('admin.fee-groups.create');
        Route::post('fee-groups/create', 'store')->name('admin.fee-groups.store');
        Route::get('fee-groups/edit/{feeGroup}', 'edit')->name('admin.fee-groups.edit');
        Route::put('fee-groups/edit/{feeGroup}', 'update')->name('admin.fee-groups.update');
        Route::delete('fee-groups/delete/{feeGroup}', 'destroy')->name('admin.fee-groups.destroy');
    });

    // Route mahasiswa
    Route::controller(StudentController::class)->group(function(){
        Route::get('students', 'index')->name('admin.students.index');
        Route::get('students/create', 'create')->name('admin.students.create');
        Route::post('students/create', 'store')->name('admin.students.store');
        Route::get('students/create/student:{students_number}', 'edit')->name('admin.students.edit');
        Route::put('students/create/{student:students_number}', 'update')->name('admin.students.update');
        Route::delete('students/delete/{student:student_number}', 'destroy')->name('admin.students.destroy');
    });
});
