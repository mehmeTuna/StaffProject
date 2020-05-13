<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

@include('front.head')


<body data-spy="scroll" data-target="#pb-navbar" data-offset="200">
    @include('front.headNavigation')

    <div id="kiosk-app"
        class="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light">

    </div>

    <section class="pb_section bg-light pb_slant-white pb_pb-250" id="section-features">
        <div class="container">
            <div class="row justify-content-center mb-5">
                <div class="col-md-6 text-center mb-5">
                    <h5 class="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2">
                        <strong>Features</strong></h5>
                    <h2>App Features</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md- col-sm-6">
                    <div class="media d-block pb_feature-v1 text-left">
                        <div class="pb_icon"><i class="ion-ios-bookmarks-outline pb_icon-gradient"></i></div>
                        <div class="media-body">
                            <h5 class="mt-0 mb-3 heading">Minimal Design</h5>
                            <p class="text-sans-serif">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md- col-sm-6">
                    <div class="media d-block pb_feature-v1 text-left">
                        <div class="pb_icon"><i class="ion-ios-speedometer-outline pb_icon-gradient"></i></div>
                        <div class="media-body">
                            <h5 class="mt-0 mb-3 heading">Fast Loading</h5>
                            <p class="text-sans-serif">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md- col-sm-6">
                    <div class="media d-block pb_feature-v1 text-left">
                        <div class="pb_icon"><i class="ion-ios-infinite-outline pb_icon-gradient"></i></div>
                        <div class="media-body">
                            <h5 class="mt-0 mb-3 heading">Unlimited Possibilities</h5>
                            <p class="text-sans-serif">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md- col-sm-6">
                    <div class="media d-block pb_feature-v1 text-left">
                        <div class="pb_icon"><i class="ion-ios-color-filter-outline pb_icon-gradient"></i></div>
                        <div class="media-body">
                            <h5 class="mt-0 mb-3 heading">Component Based Design</h5>
                            <p class="text-sans-serif">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md- col-sm-6">
                    <div class="media d-block pb_feature-v1 text-left">
                        <div class="pb_icon"><i class="ion-ios-wineglass-outline pb_icon-gradient"></i></div>
                        <div class="media-body">
                            <h5 class="mt-0 mb-3 heading">Clean Code</h5>
                            <p class="text-sans-serif">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md- col-sm-6">
                    <div class="media d-block pb_feature-v1 text-left">
                        <div class="pb_icon"><i class="ion-ios-paperplane-outline pb_icon-gradient"></i></div>
                        <div class="media-body">
                            <h5 class="mt-0 mb-3 heading">Lightweight</h5>
                            <p class="text-sans-serif">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- END section -->

    <section class="pb_section pb_slant-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-5">

                </div>
                <div class="col-lg-8 pl-md-5 pl-sm-0">
                    <div class="row">
                        <div class="col">
                            <h2>Application Features</h2>
                            <p class="pb_font-20">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg">

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-bookmarks-outline pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Minimal Design</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-infinite-outline pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Unlimited Posibilities</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg">

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-speedometer-outline pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Fast Loading</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-color-filter-outline  pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Component Based Design</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <!-- END section -->

    <section class="pb_section bg-light pb_slant-white">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 order-2">
                    <img src="assets/images/phone_3.png" alt="Image placeholder" class="img-fluid">
                </div>
                <div class="col-lg-8 pr-md-5 pr-sm-0 order-1  mb-5">
                    <div class="row">
                        <div class="col">
                            <h2>Application Features</h2>
                            <p class="pb_font-20">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg">

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-bookmarks-outline pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Minimal Design</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-infinite-outline pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Unlimited Posibilities</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg">

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-speedometer-outline pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Fast Loading</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                            <div class="media pb_feature-v2 text-left mb-1 mt-5">
                                <div class="pb_icon d-flex mr-3 align-self-start pb_w-15"><i
                                        class="ion-ios-color-filter-outline  pb_icon-gradient"></i></div>
                                <div class="media-body">
                                    <h3 class="mt-2 mb-2 heading">Component Based Design</h3>
                                    <p class="text-sans-serif pb_font-16">Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <!-- END section -->


    <footer class="pb_footer bg-light" role="contentinfo">
        <div class="container">
            <div class="row text-center">
                <div class="col">
                    <ul class="list-inline">
                        <li class="list-inline-item"><a href="#" class="p-2"><i class="fa fa-facebook"></i></a></li>
                        <li class="list-inline-item"><a href="#" class="p-2"><i class="fa fa-twitter"></i></a></li>
                        <li class="list-inline-item"><a href="#" class="p-2"><i class="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col text-center">
                    <p class="pb_font-14">&copy; 2019. All Rights Reserved. <br> <a
                            href="https://uicookies.com/bootstrap-html-templates/">Bootstrap Templates</a> by uiCookies
                    </p>
                    <p class="pb_font-14">Demo Images: <a href="https://unsplash.com/" target="_blank"
                            rel="nofollow">Unsplash</a></p>
                </div>
            </div>
        </div>
    </footer>


    <script src="public/kiosk/home/js/home.js"></script>

    <script src="/public/front/assets/js/jquery.min.js"></script>
    <script src="/public/front/assets/js/slick.min.js"></script>
    <script src="/public/front/assets/js/bootstrap.min.js"></script>

</body>

</html>