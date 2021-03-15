(function ($) {
    "use strict";

    jQuery(document).on('ready', function () {


        function initNav() {
            /***MENU TOGGLE ANIMATION***/
            $('div.toggle-normal').on('click', function () {
                $('i.top-bar').toggleClass('top-transform');
                $('i.middle-bar').toggleClass('middle-transform');
                $('i.bottom-bar').toggleClass('bottom-transform');
            });


            /***MENU CLOSE***/
            $('.section,div#menu-options a').on('click', function () {
                $('nav#theMenu').removeClass('menu-open');
                $('i.top-bar').removeClass('top-transform');
                $('i.middle-bar').removeClass('middle-transform');
                $('i.bottom-bar').removeClass('bottom-transform');
            });

            /***MENU OPEN***/
            $('div#menuToggle').on('click', function () {
                $('div#menuToggle').toggleClass('active');
                $('body').toggleClass('body-push-toright');
                $('nav#theMenu').toggleClass('menu-open');
            });
        }

        function initSmoothScroll() {
            /***SMOOTH SCROLL***/
            $('div#menu-options,div#about-btn').find('a[href*=#]:not([href=#])').on('click', function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 900, "swing");
                        return false;
                    }
                }
            });
        }


        function initScrollToTop() {
            /***SCROLL TO TOP***/
            $(window).on('scroll', function () {
                if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
                    $('div#scrollup').addClass('animated flipInY').fadeIn(200);    // Fade in the arrow
                } else {
                    $('div#scrollup').fadeOut(200);
                }
            });

            $('div#scrollup').on('click', function () {
                $("html,body").animate({
                    scrollTop: 0
                }, 600);

                return false;
            });
        }

        function initSkills() {
            /***SKILLS***/
            am4core.ready(function() {
                // Themes begin
                am4core.useTheme(am4themes_material);
                am4core.useTheme(am4themes_animated);

                var chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud); 
                var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

                series.dataFields.word = "tag";
                series.dataFields.value = "weight"; 
                series.angles = [0,0,0,0,90]
                series.labels.template.fill = am4core.color("#fff");
                
                chart.preloader.disabled = true;

                series.data = [
                { "weight":4,"tag":"AWS"},
                { "weight":4,"tag":"Docker"},
                { "weight":4,"tag":"DevOps"},
                { "weight":3,"tag":"Azure"},
                { "weight":3,"tag":"C#"},
                { "weight":3,"tag":".NET Core"},
                { "weight":4,"tag":"Product ownership"},
                { "weight":3,"tag":"DNS"},
                { "weight":3,"tag":"Cloud architecture"},
                { "weight":3,"tag":"Security"},
                { "weight":2,"tag":"React"},
                { "weight":2,"tag":"MongoDB"},
                { "weight":2,"tag":"Scrum"},
                { "weight":2,"tag":"Automation"},
                { "weight":3,"tag":"Terraform"},
                { "weight":2,"tag":"Kubernetes"},
                { "weight":2,"tag":"ECS"},
                { "weight":2,"tag":"AWS Lambda"},
                { "weight":1,"tag":"Java"},
                { "weight":1,"tag":"JavaScript"},
                { "weight":1,"tag":"TypeScript"},
                { "weight":1,"tag":"Angular"},
                { "weight":1,"tag":"ASP.NET MVC"},
                { "weight":1,"tag":"Google Cloud"},
                { "weight":1,"tag":"Docker Swarm"},
                { "weight":1,"tag":"Azure Functions"},
                { "weight":1,"tag":"Akamai"},
                { "weight":1,"tag":"CloudFlare"},
                { "weight":1,"tag":"XML"},
                { "weight":1,"tag":"Git"},
                { "weight":2,"tag":"Jenkins"},
                { "weight":1,"tag":"CircleCI"},
                { "weight":1,"tag":"GitHub Actions"},
                { "weight":1,"tag":"AppVeyor"},
                { "weight":1,"tag":"MS SQL"},
                { "weight":1,"tag":"Postgres"},
                { "weight":1,"tag":"AWS DynamoDB"},
                { "weight":1,"tag":"Azure Container Service"},
                { "weight":1,"tag":"Azure Storage"},
                { "weight":1,"tag":"S3"},
                { "weight":1,"tag":"Route53"},
                { "weight":1,"tag":"Powershell"},
                { "weight":1,"tag":"Bash"},
                { "weight":1,"tag":"Linux"},
                { "weight":1,"tag":"Software defined networking"},
                { "weight":1,"tag":"HTML5"},
                { "weight":1,"tag":"CSS"},
                { "weight":2,"tag":"Ansible"}                                
                ];
            });
        }

        function initVideoPlayAndClose() {
            /***VIDEO PLAY BUTTON***/
            $('#html-video').addClass('hidden');
            $('#play-btn').on('click', function () {
                var htmlVideo = '#html-video';
                var vCard = '#v-card';
                var playButtonHolder = '#button-holder';
                var playIcon = '#icon-play';
                $(playButtonHolder).addClass('middle');
                setTimeout(function () {
                    $(vCard).addClass('hide-overflow');
                    $('body').addClass('scale-effect');
                    $(vCard).addClass('height-change');
                }, 600);
                setTimeout(function () {
                    $(playIcon).hide();
                    $(htmlVideo).removeClass('hidden');
                    $(htmlVideo)[0].play();
                    $('#play-btn').addClass('black');
                }, 1000);

            });

            /***VIDEO CLOSE BUTTON***/
            $('#close-btn').on('click', function () {
                var htmlVideo = '#html-video';
                var vCard = '#v-card';
                var playButtonHolder = '#button-holder';
                var playIcon = '#icon-play';
                $('body').removeClass('scale-effect');
                setTimeout(function () {
                    $(playIcon).show();
                    $(playButtonHolder).removeClass('middle');
                    $(vCard).removeClass('hide-overflow');
                }, 1000);
                $(vCard).removeClass('height-change');
                $(htmlVideo).addClass('hidden');
                $(htmlVideo)[0].pause();
                $('#play-btn').removeClass('black');
            });
        }

        function initMail() {
            /***MAIL SCRIPT***/
            $('form#contact-form').on('submit', function (e) {
                e.preventDefault(); //Prevents default submit
                var form = $(this);
                $("#submit").attr('disabled', 'disabled'); //Disable the submit button on click
                var post_data = form.serialize(); //Serialized the form data
                $('div#form-loader').removeClass('is-hidden').fadeIn(500);
                $.ajax({
                    type: 'POST',
                    url: 'php/mail_handler.php', // Form script
                    data: post_data
                })
                    .done(function () {
                        $('div#form-loader').fadeOut(500);
                        Materialize.toast('Message Sent! I will contact you shortly, Thanks', 4000);
                        $("form#contact-form")[0].reset();
                        Materialize.updateTextFields(); // Rest floating labels
                        $("#submit").removeAttr('disabled', 'disabled'); // Enable submit button

                    })
                    .fail(function () {
                        $('div#form-loader').fadeOut(500);
                        Materialize.toast('Sorry! Something Wrong, Try Again', 4000);
                        $("#submit").removeAttr('disabled', 'disabled'); // Enable submit button
                    });
            });
        }

        /* ---------------------------------------------
         INITIALIZING ALL FUNCTIONS
         --------------------------------------------- */
        initNav();               //for main NAV
        initSmoothScroll();      // enables SmoothScroll
        initScrollToTop();       // Smooth Scroll To Top
        initSkills();
        initVideoPlayAndClose(); // Video Play and Close Functionality
        initMail();              // Mail Initialization
    });


    jQuery(window).on('load', function () {

        /***FADES OUT PRE-LOADER***/
        $('div#loading').fadeOut(500);

        /***SCROLL ANIMATION***/
        window.sr = ScrollReveal({reset: false}); // reset false stops repetition of animation
        var commonCards = '#port-add-icon,#map-card,.interest-icon-even,.interest-icon,' +
            '.timeline-dot,.timeline-content,#add-more,#skills-card,#testimonials-card,' +
            '#portfolios-card,#interest-card,#p-one,#p-two,#p-three,#blog-card,#contact-card,#clients,.section-title img';
        // Customizing a reveal set
        sr.reveal(commonCards, {duration: 1100});
        sr.reveal('#about-card,.map-label', {duration: 1400, delay: 500});
        sr.reveal('#v-card-holder', {duration: 1400, distance: '150px'});
    });


})(jQuery);
