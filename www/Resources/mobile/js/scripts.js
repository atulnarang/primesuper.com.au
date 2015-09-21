;/*
 *	Project Name
 *	Author First Lastname
 *   Copyright © YEAR, Website URL
 *   All rights reserved.
 */

var iPhone = false;
var iPad = false;

rm = {
	init: function() {

		// iPad Detection
		if (navigator.userAgent.toLowerCase().indexOf('ipad') != -1) $('body').addClass('ipad');

		$(document).ready(function() {

		});
		$(window).resize(function() {
			rm.equalheights.init()
		});

		rm.mobileNavigation.init()
		rm.accordion.init()
		//rm.loadMore.init()
		rm.tabs.init()
		rm.innerLink.init()
		rm.equalheights.init()
		rm.loginButtons.init()
		rm.performanceSelect.init()

	},

	mobileNavigation: {
		init: function() {
			$(".nav-drop > a").on("click touchstart", function(n) {
				n.preventDefault();
				var t = $(this),
					i = t.text().toLowerCase().replace(/ /gi, "-");
				$(this).hasClass("open") ? ($(".nav-drop a").removeClass("open"),
					$(".nav-drop ul").stop().slideUp(),
					$("body").removeClass("nav-open")) : ($(".nav-drop a").removeClass("open"),
					$(".nav-drop ul").stop().slideUp(),
					$(this).addClass("open"),
					$(this).next("ul").stop().slideDown(),
					$("body").addClass("nav-open"))
			})

		}
	},

	loginButtons: {
		init: function() {
			
        $('#login').change(function () {
            var $this = $(this);
            if ($this.val() != 'login') {
                window.location.href = $this.val();
            }
        });

        
   
		}
	},
 
	performanceSelect: {
		init: function() {
			$('.performance-selector').change(function(){
				var selected = $(this).find(':selected').val();
				//alert(selected);
				$(".data-row").hide();
				$(selected).show();
			}).change()

		}
	},

	/*
	loadMore: {
		init: function() {
			$(".contact-listing").hide().slice(0, 5).show();
			$("#loadmore").click(function(e) {
				e.preventDefault();
				$(".contact-listing:hidden").slice(0, 5).fadeIn();
				if ($(".contact-listing:hidden").length == 0) {
					$("#loadmore").hide();
				}
			});
		}
	},
	*/

	innerLink: {
		init: function() {
			$('.listing a').each(function() {
				$(this).append('<span class="icon" />')
			})
		}
	},



	equalheights: {
		init: function() {
			function n(n) {
				var t = 0;
				n.each(function() {
					$(this).css({
						height: "",
						height: ""
					});
					var n = $(this).height();
					n > t && (t = n)
				}), n.each(function() {
					$(this).css("height", t)
				})
			}
			n($(".module-contact .tabs-primary li")),
			//n($(".module-contact .tabs-primary li a")),
			n($(".investment-options .tabs-secondary li"))
		}
	},

	accordion: {
		init: function() {
			$(".accordion > .accordion-wrapper:has(.accordion-content)").addClass("has-child").children('a').append('<span class="icon" />');
			$(".accordion > .has-child > a").click(function() {
				$(this).toggleClass('open');
				$(this).next('.accordion-content').slideToggle();
				return false;
			});
		}
	},

	tabs: {
		init: function() {

			$('ul.tabs').each(function() {
				// For each set of tabs, we want to keep track of
				// which tab is active and it's associated content
				var $active, $content, $links = $(this).find('a');

				// If the location.hash matches one of the links, use that as the active tab.
				// If no match is found, use the first link as the initial active tab.
				$active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
				$active.closest('li').addClass('active');
				$content = $($active.attr('href'));

				// Hide the remaining content
				$links.not($active).each(function() {
					$($(this).attr('href')).hide();
				});

				// Bind the click event handler
				$(this).on('click', 'a', function(e) {
					// Make the old tab inactive.
					$active.closest('li').removeClass('active');
					$content.hide();

					// Update the variables with the new link and content
					$active = $(this);
					$content = $($(this).attr('href'));

					// Make the tab active.
					$active.closest('li').addClass('active');
					$content.show();

					// Prevent the anchor's default click action
					e.preventDefault();
				});
			});

		}
	},



};


$(function() {

	rm.init();

	/* ADD MORE INITIALIZERS HERE */
})