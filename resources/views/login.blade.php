<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - {{env("APP_NAME")}}</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="shortcut icon" href="/favicon.png" type="image/png">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    @vite("resources/scss/__loader.scss")
    @vite("resources/ts/login.ts")
</head>

<body id="login_main">
    @include('Fragments.loader')
    <div class="container pt-3 d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 card shadow">
            <div class="card-body">
                <div class="d-flex flex-wrap">
                    <div class="flex-grow-1">
                        <small class="text-muted"><i class="fas fa-pizza-slice"></i> {{env('APP_NAME')}} {{env('APP_RELEASE')}}</small>
                        <h3>Acesso</h3>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="darkModeSwitch">
                        <label class="form-check-label" for="darkModeSwitch">Modo Escuro</label>
                    </div>
                </div>

                @if($errors->any())
                {!! implode('', $errors->all('<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    :message
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>')) !!}
                @endif


                @if (Session::has('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{Session::get('success')}}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif

                <form action="{{route('app.validateLogin')}}" method="POST">
                    @csrf

                    <div class="my-3">
                        <label for="login" class="form-label">Login</label>
                        <input type="text" name="login" id="login" class="form-control" required>
                    </div>

                    <div class="my-3">
                        <label for="password" class="form-label">Senha</label>
                        <input type="password" name="password" id="password" class="form-control" required>
                    </div>

                    <button type="submit" class="btn btn-primary mt-3">Entrar</button>
                </form>
            </div>

        </div>
    </div>

    <code class="text-center container">
        <p> &COPY; {{env('APP_NAME')}} {{env('APP_RELEASE')}}</p>
        <p>For testing purposes only. Version {{env('APP_VERSION')}}</p>
    </code>

</body>

</html>