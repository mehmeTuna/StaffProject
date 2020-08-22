<!doctype html>
<html lang="tr" dir="ltr">

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title> Beta - Version 2.0</title>
    <!-- base:css -->
    <link rel='stylesheet' href='/public/vendors/select2-bootstrap-theme/select2-bootstrap.min.css'>
    <!-- endinject -->
    <!-- plugin css for this page -->
    <link rel="stylesheet" href="/public/vendors/flag-icon-css/css/flag-icon.min.css" />
    <link rel="stylesheet" href="/public/vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/public/vendors/jquery-bar-rating/fontawesome-stars-o.css">
    <link rel="stylesheet" href="/public/vendors/jquery-bar-rating/fontawesome-stars.css">
    <!-- End plugin css for this page -->
    <link rel="stylesheet" href="/public/css/style.css">
    <style>
        body {
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .isapp {
            width: inherit;
            height: inherit;
        }
    </style>
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root" class="isapp"></div>

    <script src="/public/js/App.js"></script>
</body>

</html>
