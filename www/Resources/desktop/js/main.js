/* ...................................................

	Prime Super Javascript functions.

................................................... */
var $IE7;
var primesuper = {

    init: function () {

        if ($.browser.msie) {
            if ($.browser.version < 9) $IE7 = true;
            else $IE7 = false;
        } else $IE7 = false;

        //primesuper.cufon.init();

        $(document).ready(function () {
            //primesuper.cufon.ready();
            primesuper.fontresize.init();
            primesuper.dropdown.init();
            primesuper.navigation.init();
            primesuper.search.init();
            primesuper.drawer.init();
            primesuper.tooltip.init();
            primesuper.login.init();
            primesuper.tabs.init();
            //primesuper.randomload.init();
            primesuper.tablehover.init();
            primesuper.sideContentSubNav.init();
            primesuper.productFAQs.init();
            primesuper.minimap.init();
            primesuper.emailFriendInput.init();

        });
    },

    emailFriendInput: {
        init: function () {
            $('#contour_form_Emailafriend .contourFieldSet input.text:first').attr('disabled', true);

        }
    },

    /*cufon: {
        init: function () {
            Cufon.replace('#nav ul li .cufon, #footerFeatures h2, #footerFeatures p:not(.mapFooter #footerFeatures p), .breadcrumbs ul li, #infobox-content h2, .mapFooter #footerFeatures a, #mapLanding li p, .globalBanner h1, .subContent h3, .sideAccordion > li > a, .moduleNewsList .details h3 a', { hover: true, fontFamily: 'HelvNueBold' });
            Cufon.replace('#promoFeature ul li, .cufon', { fontFamily: 'HelvNueBold' });
            Cufon.replace('.cufon_light, .mapFooter #footerFeatures p', { fontFamily: 'helveticaNeue_Light' });
            Cufon.replace('.wysiwyg h2', { fontFamily: 'HelvNueBold' });

            //Cufon.replace('#infobox-content .header h2', { fontFamily: 'HelvNueBold' });
        },
        ready: function () {
            Cufon.now();
        }
    },*/

    fontresize: {
        init: function () {

            // check cookie on font size
            // default setting on font-size:
            var levelone = '1em';
            var leveltwo = '1.16em';
            var levelthree = '1.33em';
            var presetFontsize = $.cookie('fontsize');

            if (presetFontsize == 1) {
                $('#content').css({ 'font-size': leveltwo });
            }
            else if (presetFontsize == 2) {
                $('#content').css({ 'font-size': levelthree });
            }
            else {
                $('#content').css({ 'font-size': levelone });
            }

            // check if it's not a landing or homepage.
            // if not, then add text resize control
            var bodyClass = $('body').attr('class');



            var resizeControlsString = '<li class="sizeUp"><a href="#">Text size up</a></li>';
            resizeControlsString += '<li class="sizeDown"><a href="#">Text size down</a></li>';
            resizeControlsString += '<li class="print"><a href="#">Print</a></li>';
            $('#contentControls').prepend(resizeControlsString);

            // activate print control
            $('#contentControls li.print a').click(function (e) {
                window.print();
                e.preventDefault();
            });

            // activate text resize
            $('#contentControls li.sizeUp a').click(function (e) {
                var level = $.cookie('fontsize');
                if (level == 1 || level == 2) {
                    $('#content').css({ 'font-size': levelthree });
                    $.cookie('fontsize', 2);
                }
                else {
                    $('#content').css({ 'font-size': leveltwo });
                    $.cookie('fontsize', 1);
                }
                e.preventDefault();
            });
            $('#contentControls li.sizeDown a').click(function (e) {
                var level = $.cookie('fontsize');
                if (level == 1 || level == 0) {
                    $('#content').css({ 'font-size': levelone });
                    $.cookie('fontsize', 0);
                }
                else {
                    $('#content').css({ 'font-size': leveltwo });
                    $.cookie('fontsize', 1);
                }
                e.preventDefault();
            });

            if ($('body').hasClass('home')) {
                // activate home promo feature cycle - because it's a homepage
                $('#promoFeature ul#promoItems').before('<ul id="promoNav">').cycle({
                    fx: 'fade',
                    speed: 1000,
                    timeout: 5000,
                    pager: '#promoNav',

                    pagerAnchorBuilder: function (idx, slide) {
                        idx = idx + 1;
                        return '<li><a href="#">' + idx + '</a></li>';
                    }
                });
            }
        }
    },

    dropdown: {
        init: function () {

            // state select
            // 1. wrap the list with class, then add trigger button
            $('.stateSelect ul').wrap('<div class="stateSelectDropdown"></div>').before('<img src="/Resources/desktop/img/buttons/stateSelect-btn.png" formalt="Select a state" />')
            // 2. activate state select
            $('.stateSelectDropdown').hover(function () {
                $('ul', this).show();
            }, function () {
                $('ul', this).hide();
            });
            // note: list will not appear if javascript = off	


            //Hover for quicklinks
            $('#quickLinks').hover(function () {
                $('ul', this).show();
                $(this).addClass('active');
            }, function () {
                $('ul', this).hide();
                $(this).removeClass('active');
            });

            $('#recent-visits').hover(function () {
                $('#mapNavWrapper', this).show();
                $(this).addClass('active');
                $('.mapWrapper').css('overflow', 'visible');
            }, function () {
                $('#mapNavWrapper', this).hide();
                $(this).removeClass('active');
                $('.mapWrapper').css('overflow', 'hidden');
            });
 
            // form select
            // 1. wrap the list with class, then add trigger button
            $('.formSelect ul').wrap('<div class="formSelectDropdown"></div>').before('<img src="/Resources/desktop/img/buttons/formSelect-btn.gif" alt="Select a form" />')
            // 2. activate form select
            $('.formSelectDropdown').hover(function () {
                $('ul', this).show();
            }, function () {
                $('ul', this).hide();
            });
            // note: list will not appear if javascript = off	



            //Hover for quicklinks
            $('#quickLinks').hover(function () {
                $('ul', this).fadeIn(200);
                $(this).addClass('active');
            }, function () {
                $('ul', this).fadeOut(200);
                $(this).removeClass('active');
            });

        }
    },

    navigation: {
        init: function () {


            if (!$("body").hasClass("home")) {
              $('#nav a[href^="/' + location.pathname.split("/")[1] + '"]').parent().addClass('on');
          }

            //Nav hover drop down colour - cufon hack
            /*$('#nav li ul').hover(function () {
                $(this).css('display', 'block');
                $('#nav a.tools').css('color', '#5B6E1D');
            },
            function () {
                $('#nav a.tools').css('color', '#A8B382');
                //Cufon.refresh('#nav a.tools');
            });

            $('#nav li').removeClass('on');

            $('#nav li').hover(function () {
                $('ul', this).show();
                $(this).addClass('on');
            }, function () {
                $('ul', this).fadeOut(150);
                $(this).delay(250).removeClass('on');
            });
            */

 

        }
    },

    search: {
        init: function () {
            //Remove search text
            $(".searchInput").focus(function (srcc) {
                if ($(this).val() == $(this)[0].value) {
                    $(this).removeClass("searchInputActive");
                    $(this).val("");
                }
            });

            $(".searchInput").blur(function () {
                if ($(this).val() == "Search") {
                    $(this).addClass("searchInputActive");
                    $(this).val($(this)[0].value);
                }
            });

            $(".searchInput").blur();

            $(".searchInput").keypress(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    $(".searchButton").click();
                }
            });
        }
    },

    drawer: {
        init: function () {
            //Aus Map Drawer
            primesuper.drawer.$drawer = $('#manager-drawer'),
                primesuper.drawer.$drawerBtn = $("#drawerButton"),
                primesuper.drawer.$mapDetails = $(".mapWrapper"),
                primesuper.drawer.$mapDetailWrap = $('.mapContain'),
                primesuper.drawer.$drawerItem = $('#manager-drawer ul li'),
                primesuper.drawer.$managerLink = $('#manager-drawer li span'),
                primesuper.drawer.$managerClose = $('#managerClose');

            //Overlay
            $('body.mapMaster').append('<div id="overlay"/>');
            primesuper.drawer.$overlay = $('#overlay');

            //open close draw events
            primesuper.drawer.$drawerBtn.click(function (e) {
                e.stopPropagation();

                primesuper.drawer.$mapDetailWrap.stop().animate({ height: '735px' }, { duration: 400, easing: 'easeOutCubic' });
                primesuper.drawer.$mapDetails.fadeOut(400);
                primesuper.drawer.$drawer.delay(400).fadeIn(400);
                primesuper.drawer.$overlay.stop().delay(400).show();
                //Only show close button after first manager has been selected
                $('#managerClose').show();
            });

            primesuper.drawer.$overlay.click(function () {
                //Only closes overlay after first manager has been selected
                if ($('#managerClose').is(':hidden')) {
                    //Do nothing
                } else {
                    primesuper.drawer.closeDrawer();
                }
            });

            primesuper.drawer.$managerClose.click(function () {
                primesuper.drawer.closeDrawer();
            });

            primesuper.drawer.$managerLink.click(function () {
                primesuper.drawer.closeDrawer();
            });


        },

        closeDrawer: function () {
            primesuper.drawer.$mapDetailWrap.animate({ height: '165px' }, { duration: 400, easing: 'easeOutCubic' });
            primesuper.drawer.$drawer.fadeOut(400);
            primesuper.drawer.$mapDetails.delay(400).fadeIn(400);
            primesuper.drawer.$overlay.stop().delay(150).hide();
        }

    },

    tooltip: {
        init: function () {



            var $button = $('#mapLanding li a');

            $button.mouseenter(function () {
                if ($IE7) {
                    $(this).siblings('.tooltip').show();
                    $(this).siblings('.portrait').hide();
                } else {
                    $(this).siblings('.tooltip').stop().animate({ opacity: 1 }, { duration: 100, easing: 'easeOutCubic' }).css('display', 'block');
                    $(this).siblings('.portrait').hide();
                }
            });

            $button.mousemove(function (e) {
                var posX = $(this).offset().left,
                    posY = $(this).offset().top,
                    xOffset = 470,
                    yOffset = 20;
                //console.log("POSITION: " + (posX - 93));
                //console.log("e.pageX: " + e.pageX);

                if ($(this).parent().hasClass('right')) {
                    $(this).siblings('.tooltip').css('left', (e.pageX - (posX - 93)) - 70).css('top', (e.pageY - (posY + 93)) + yOffset).css('display', 'block');
                } else {
                    // from e you can get the pageX(left position) and pageY(top position)
                    $(this).siblings('.tooltip').css('left', (e.pageX - (posX - 93)) - xOffset).css('top', (e.pageY - (posY + 93)) + yOffset).css('display', 'block');
                }
            });

            $button.mouseleave(function () {
                if ($IE7) {
                    $(this).siblings('.tooltip').hide();
                    $(this).siblings('.portrait').fadeIn(200);
                } else {
                    $(this).siblings('.tooltip').stop().animate({ opacity: 0 }, { duration: 100, easing: 'easeOutCubic' }).css('display', 'none');
                    $(this).siblings('.portrait').stop().animate({ opacity: 1 }, { duration: 400, easing: 'easeOutCubic' }).css('display', 'block');
                }
            });
        }
    },

    login: {
        init: function () {

            var $loginBtn = $('#loginLink'),
                $loginBox = $('#loginBox');

            $loginBtn.hover(
                function () {
                    $loginBtn.children('a.accessAccount').addClass('expanded');
                    $loginBox.stop(true, true).slideDown({ duration: 300, easing: 'easeOutCubic' });
                },
                function () {
                    $loginBtn.children('a.accessAccount').removeClass('expanded');
                    $loginBox.stop(true, true).slideUp({ duration: 300, easing: 'easeOutCubic' });
                }
            ).find('a.accessAccount').click(function(e) {
                e.preventDefault();
            });

        }
    },

    minimap: {
        init: function () {
            var $miniMap = $('#ausMap');

            //$miniMap.after('<ul id="ausMapNav">').cycle({
            $miniMap.cycle({
                fx: 'fade',
                speed: 800,
                timeout: 5500
                //pager: '#ausMapNav',

                    /*pagerAnchorBuilder: function (idx, slide) {
                        idx = idx + 1;
                        return '<li><a href="#">' + idx + '</a></li>';
                    }*/
            });

        }
    },
   
    tabs: {
        init: function(){
            $('#tabs, #link-tabs-1, #link-tabs-2, .filter-tabs').tabs();
            

            //Cufon.replace('.ui-tabs .ui-tabs-nav li a', { fontFamily: 'HelvNueBold', hover:true });

            //Refresh cufon colours
            $('#tabs').bind('tabsshow', function() {
                //Cufon.refresh('.ui-tabs .ui-tabs-nav li a');
            });

            //Cufon.refresh();

        }
    },

    tablehover: {
        init: function() {

            $('.tabTable').rmTableHover({ 
                horizontal: true,
                vertical: true
            });
        }
    },

    randomload: {
        init: function() {
                        
            //Random load image
            $(document).ready(function () {
            $('.shuffleCol1').randomImage({ path: '/resources/desktop/img/elements/' });
            $('a:first').click(function () {
            location.reload();
            return false;
            });
            });

            (function ($) {
            $.randomImage = {
            defaults: {
            //you can change these defaults to your own preferences.
            path: '/resources/desktop/img/elements/', //change this to the path of your images
            myImages: ['man1_1.jpg', 'man1_2.jpg', 'man1_3.jpg']
            }
            }
            $.fn.extend({
            randomImage: function (config) {
            var config = $.extend({}, $.randomImage.defaults, config);
            return this.each(function () {
            var imageNames = config.myImages;
            //get size of array, randomize a number from this
            // use this number as the array index
            var imageNamesSize = imageNames.length;
            var lotteryNumber = Math.floor(Math.random() * imageNamesSize);
            var winnerImage = imageNames[lotteryNumber];
            var fullPath = config.path + winnerImage;
            //put this image into DOM at class of randomImage
            // alt tag will be image filename.
            $(this).attr({
            src: fullPath,
            alt: winnerImage
            });
            });
            }
            });
            })(jQuery);

            //Random Load Image Column 2
            $(document).ready(function () {
            $('.shuffleCol2').randomImageCol2({ path: '/resources/desktop/img/elements/' });
            $('a:first').click(function () {
            location.reload();
            return false;
            });
            });

            (function ($) {
            $.randomImageCol2 = {
            defaults: {
            //you can change these defaults to your own preferences.
            path: '/resources/desktop/img/elements/', //change this to the path of your images
            myImages: ['man2_1.jpg', 'man2_2.jpg', 'man2_3.jpg']
            }
            }
            $.fn.extend({
            randomImageCol2: function (config) {
            var config = $.extend({}, $.randomImageCol2.defaults, config);
            return this.each(function () {
            var imageNames = config.myImages;
            //get size of array, randomize a number from this
            // use this number as the array index
            var imageNamesSize = imageNames.length;
            var lotteryNumber = Math.floor(Math.random() * imageNamesSize);
            var winnerImage = imageNames[lotteryNumber];
            var fullPath = config.path + winnerImage;
            //put this image into DOM at class of randomImage
            // alt tag will be image filename.
            $(this).attr({
            src: fullPath,
            alt: winnerImage
            });
            });
            }
            });
            })(jQuery);
    
        }
    },

    sideContentSubNav: {

        init: function() {

            $('#sideContent').find('.sideAccordion > li.parent > a').click(function(e) {
                
                var $thisSection = $(this).parent();

                if ($thisSection.hasClass('open')) {
                    $thisSection.removeClass('open');
                } else {
                    $thisSection.addClass('open').siblings().removeClass('open');
                    //Cufon.replace('.sideAccordion > li.parent > a', { hover: true, fontFamily: 'HelvNueBold' });
                }

                e.preventDefault();

            });

        }

    },
    

    sideContentSubNav2: {

        init: function() {

            $('#sideContent').find('.sideAccordion2 > li.parent2 > a').click(function(e) {
                
                var $thisSection = $(this).parent();

                if ($thisSection.hasClass('open')) {
                    $thisSection.removeClass('open');
                } else {
                    $thisSection.addClass('open').siblings().removeClass('open');
                    //Cufon.replace('.sideAccordion > li.parent > a', { hover: true, fontFamily: 'HelvNueBold' });
                }

                e.preventDefault();

            });

        }

    },

    productFAQs: {

        init: function() {

            $('.productsFAQ li').addClass('closed');

            $('.productsFAQ li h3').click(function(e) {
                $(this).parent().toggleClass('closed');
                e.preventDefault();
            });

        }

    }


};

primesuper.init();