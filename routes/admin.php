<?php

use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\FakultasController;
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
        Route::delete('fakultas/delete', 'destroy')->name('admin.fakultas.destroy');
    });
});