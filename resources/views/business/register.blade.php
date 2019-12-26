<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>SCI -demo</title>
    <!-- diğer meta tag lar ve title ülkeye göre eklenecek -->
    <!-- Fonts -->
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

    <style>
        .primaryColor {
            background-color: #75B72B;
        }
        input::placeholder {
            color: #75B72B;
        }
    </style>
</head>
<body class="bg-gray-100 flex bg-local">
<div class="primaryColor mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
    <form method="post" action="{{ action('BusinessController@register') }}" accept-charset="UTF-8">
        <input name="_token" type="hidden" value="{{ csrf_token() }}"/>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="business">
                        Business Name*
                    </label>
                    <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="business" required name="businessName" type="text" placeholder="business Name">
                    <div>
                    </div>
                </div>
                <div class="md:w-1/2 px-3">
                    <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="username">
                        Business Username*
                    </label>
                    <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="username" required name="businessUsername" type="text" placeholder="Business Username">
                </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="business-email">
                        Business Email*
                    </label>
                    <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="business-email" required name="businessEmail" type="text" placeholder="Business Email">
                    <div>
                    </div>
                </div>
                <div class="md:w-1/2 px-3">
                    <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="business-telephone">
                        Business Telephone*
                    </label>
                    <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="business-telephone" required type="text" name="businessTelephone" placeholder="Business Telephone">
                </div>
            </div>
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-full px-3">
                    <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="business-address">
                        Business Address*
                    </label>
                    <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="business-address" name="businessAddress" type="text" placeholder="Business Address">
                </div>
            </div>
            <div class="-mx-6 md:flex mb-2">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <div class="md:w-full px-3">
                        <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="admin-full-name">
                            Admin Full Name*
                        </label>
                        <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="admin-full-name" required name="adminFullName" type="text" placeholder="Admin Full Name">
                    </div>
                </div>
                <div class="md:w-1/2 px-3">
                    <div class="md:w-full px-3">
                        <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="admin-telephone">
                            Admin Telephone*
                        </label>
                        <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="admin-telephone" required name="adminTelephone" type="text" placeholder="Admin Telephone">
                    </div>
                </div>
                <div class="md:w-1/2 px-3">
                    <div class="md:w-full px-3">
                        <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="adminPassword">
                            Password
                        </label>
                        <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="password" required name="adminPassword" type="password" placeholder="Admin Password">
                    </div>
                </div>
            </div>
            <div class="-mx-6 md:flex mb-2">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <div class="md:w-full px-3">
                        <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="worker-full-name">
                            Worker Full Name*
                        </label>
                        <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="worker-full-name" required name="workerFullName" type="text" placeholder="Worker Full Name">
                    </div>
                </div>
                <div class="md:w-1/2 px-3">
                    <div class="md:w-full px-3">
                        <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="worker-telephone">
                            Worker Telephone*
                        </label>
                        <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="worker-telephone" required name="workerTelephone" type="text" placeholder="Worker Telephone">
                    </div>
                </div>
                <div class="md:w-1/2 px-3">
                    <div class="md:w-full px-3">
                        <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="worker-telephone">
                            Worker Password*
                        </label>
                        <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" id="worker-password" required name="workerPassword" type="password" placeholder="Worker Password">
                    </div>
                </div>
            </div>
            <div class="md:w-1/2 px-3">
                <label>
                    <input type="checkbox" name="contract" value="true"> Kullanıcının onaylaması gereken metin
                </label>
            </div>
            <div class="-mx-3 md:flex mt-2">
                <div class="md:text-center w-full px-3">
                    <button type="submit" class="w-full primaryColor text-white font-bold py-2 px-4 border-2 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">
                        Kaydol
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>
</body>
</html>
