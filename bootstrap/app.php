<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Spatie\Permission\Middleware\RoleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ])->alias([
            'role' => RoleMiddleware::class
        ]);

        // Enable default API rate limiting
        $middleware->throttleApi();
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Log exceptions in production without exposing details to users
        $exceptions->render(function (Throwable $e, \Illuminate\Http\Request $request) {
            // Log the error for debugging
            if (!app()->isLocal()) {
                \Illuminate\Support\Facades\Log::error('Exception occurred', [
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'url' => $request->fullUrl(),
                    'user_id' => auth()->id(),
                ]);
            }

            // Don't handle if it's an HTTP exception or validation exception
            // Let Laravel handle those naturally
            if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpException ||
                $e instanceof \Illuminate\Validation\ValidationException) {
                return null;
            }

            // For Inertia requests in production, return user-friendly error
            if (!app()->isLocal() && $request->header('X-Inertia')) {
                return back()->with([
                    'message' => 'Terjadi kesalahan. Silakan coba lagi atau hubungi administrator.',
                    'type' => 'error'
                ]);
            }

            return null; // Let Laravel handle other cases
        });
    })->create();
