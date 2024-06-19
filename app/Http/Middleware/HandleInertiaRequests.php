<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            "app" => [
                'appName' => env('APP_NAME'),
                'appRelease' => env('APP_RELEASE'),
                'appVersion' => env('APP_VERSION'),
                'appFaIcon' => env('APP_FA_ICON'),
                'appMode' => env('APP_ENV'),
                'appBranch' => env('APP_BRANCH'),
                'appUrl' => env('APP_URL'),
                'appPublicUrl' => public_path(),
                'appToken' => csrf_token()
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success')
            ],
            'user' => fn () => $request->user()
                ? $request->user()->only('id', 'first_name', 'last_name', 'login', 'roles', 'email')
                : null,
        ]);
    }
}
