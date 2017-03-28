
/*=============================================================
    Authour URI: #
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US
   
    ========================================================  */


(function ($) {
    "use strict";
    var mainApp = {

        metisMenu: function () {
            $('#main-menu').metisMenu();

        },


        loadMenu: function () {
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });
        },
        slide_show: function () {
            $('#carousel-example').carousel({
                interval: 3000 // THIS TIME IS IN MILLI SECONDS
            })
        }
     }; 
 
    $(document).ready(function () {
        mainApp.metisMenu();
        mainApp.loadMenu();
        mainApp.slide_show();
    });
}(jQuery));