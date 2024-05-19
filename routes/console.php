<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('php_version', function () {
    $this->comment('PHP v' . PHP_VERSION);
})->purpose('Display a php version')->hourly();
