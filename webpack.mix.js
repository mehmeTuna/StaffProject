let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

mix.react('resources/assets/js/business/login/app.js', 'public/business/login/js');
mix.react('resources/assets/js/staff/login/app.js', 'public/staff/login/js');

mix.react('resources/assets/js/kiosk/app.js', 'public/kiosk/home/js');
