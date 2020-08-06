let mix = require('laravel-mix')

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

mix.react('resources/assets/js/admin/NewApp.js', 'public/js')

mix.react(
  'resources/assets/js/business/login/app.js',
  'public/business/login/js'
)
mix.react('resources/assets/js/staff/login/app.js', 'public/staff/login/js')
mix.react('resources/assets/js/staff/app.js', 'public/staff/home/js')
mix.react('resources/assets/js/kiosk/home.js', 'public/kiosk/home/js')

mix.react(
  'resources/assets/js/businessRegisterForm/app.js',
  'public/businessRegister/js'
)
