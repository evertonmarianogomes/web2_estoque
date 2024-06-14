<!DOCTYPE html>
<html lang="pt_BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste QR Mercado Pago</title>
    @vite('node_modules/bootstrap/dist/css/bootstrap.min.css')
    @vite('node_modules/bootstrap/dist/js/bootstrap.min.js')
</head>

<body>
    <div class="container pt-3">
        <h3>Página de Teste do Mercado Pago</h3>
        <hr>

        <img src={{$pix}} alt="QR Code Image" width="300px" height="300px">
    </div>
</body>

</html>