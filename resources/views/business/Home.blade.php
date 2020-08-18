<!doctype html>
<html lang="tr" dir="ltr">

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title> Beta - Version 2.0</title>
    <!-- base:css -->
    <link rel="stylesheet" href="/public/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="/public/vendors/feather/feather.css">
    <link rel="stylesheet" href="/public/vendors/base/vendor.bundle.base.css">
    <link rel='stylesheet' href='/public/vendors/select2/select2.min.css'>
    <link rel='stylesheet' href='/public/vendors/select2-bootstrap-theme/select2-bootstrap.min.css'>
    <!-- endinject -->
    <!-- plugin css for this page -->
    <link rel="stylesheet" href="/public/vendors/flag-icon-css/css/flag-icon.min.css" />
    <link rel="stylesheet" href="/public/vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/public/vendors/jquery-bar-rating/fontawesome-stars-o.css">
    <link rel="stylesheet" href="/public/vendors/jquery-bar-rating/fontawesome-stars.css">
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="/public/css/style.css">
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>


    <script>
        const rootData = {!! json_encode($business) !!}
    </script>

    <script src="/public/js/app.js"></script>
</body>

</html>
