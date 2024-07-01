<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="shortcut icon" href="favicon.png" type="image/png">
    <!-- <link rel="stylesheet" href="{{asset('build/assets/index-DErM8kI1.css')}}"> -->
    <!-- <link rel="stylesheet" href="{{asset('build/assets/style-32UHGlhs.css')}}"> -->


    @inertiaHead
    @viteReactRefresh
    @vite('resources/scss/style.scss')
    @vite('resources/ts/index.tsx')
    @routes

    <!-- <script src="{{asset('build/assets/index-BMOByeMZ.js')}}" type="module"></script> -->
</head>

<body>
    @include('Fragments.loader')
    @inertia


</body>

</html>