var rm = rm || {};
rm.utilities = (function() {
	'use strict';

	var reverseString = function(input) {
		if (typeof input !== 'string') {
			return undefined;
		}
		return input.split('').reverse().join('');
	};

	return {
		reverseString: reverseString
	};
}());
rm.single = (function () {
	'use strict';

	var initialize = function () {
		$('#single').text('Initialised single module');
	};

	return {
		init: initialize
	};
}());
rm.multiple = {};
rm.multiple.create = function ($element, startingCount) {
	'use strict';

	// initialise plugin
	var currentCount = startingCount;
	$('.count', $element).text('Count: ' + currentCount);

	// define functions
	var updateCount = function() {
		currentCount++;
		$('.count', $element).text('Count: ' + currentCount);
	};
	var getCount = function() {
		return currentCount;
	};

	// attach events
	// standard click handler
	$('.updateThis', $element).on('click', updateCount);
	
	// Use pub/sub for update all
	// subscribe to the event
	$.subscribe('updateAll', updateCount);

	// publish the event when "Update all" is clicked
	$('.updateAll', $element).on('click', function() {
		$.publish('updateAll');
	});

	// return public api
	return {
		increment: updateCount,
		getCount: getCount
	};
};


rm.bodyclass = (function () {
	'use strict';
	/*jslint browser: true*/
	
	var query  = window.location.search.substring(1);
		if (!query) {
		    var hash = window.location.hash;
		    query = hash.slice(hash.indexOf('?') + 1);
		}

    $('.main').addClass(query);


    setTimeout(function(){
	   //$('.ieold .main').addClass('hello-ie');
	   $('.ieold .puzzle .tile').fadeIn();
	},5000);


}());
rm.accordion = function() {
	'use strict';


	//var $accordionWrapper = $('.accordion');
	//var $accordionHeader = $('.accordion .tile-inner h3');
	//var $('.accordion .tile-content') = $('.accordion .tile-content');
	

	//if( $($accordionWrapper).length ) {

		if (rm.mq === 'small' ) {
			$('.accordion .tile-content').hide();
		}
		
		$('.accordion .tile').removeClass('open');




		if (rm.hasRunAccordion === false) {
		 	$('.accordion h3').on('click', function(e) {
		 		e.preventDefault();

		 		if (rm.mq === 'large') {
		 			return;
		 		}


			    $(this).closest('.tile').siblings().removeClass('open').find('.tile-content').slideUp(250);
			    $(this).closest('.tile').toggleClass('open').find('.tile-content').slideToggle(250);
				


		    });
			    


		

			rm.hasRunAccordion = true;
		 }

		
		
	//}

	 
};
rm.tabs = function() {
	'use strict';

	


	
	//if (!rm.hasRunTabs && rm.mq === 'large') {
	if (rm.hasRunTabs === false) {
		
		$('.tabs .tabs-header li:first-child').addClass('active');
		//$('.accordion .tile-content').show();


		$('.tabs .tabs-header li').on('click', function(e) {
			e.preventDefault();
			$('.tabs .tabs-header li').removeClass('active');
			$(this).addClass('active');

			$('#videos .tile').hide();
			var activeTab = $(this).find('a').attr('href');
			$(activeTab).show();

		});

		
	
		rm.hasRunTabs = true;
	
	}
};
rm.puzzle = function() {
	'use strict';


	var $puzzleWrapper = $('.pieces');
	var $puzzleContent = $('.tile-content');

	if( $($puzzleWrapper).length ) {
		$puzzleContent.show();

	} 

	
	

	 
};
rm.fixedHeader = (function(){
  'use strict';
 
 	var stickyOffset = $('nav').offset().top;
 	var navHeight = $('nav').height();

	$(window).scroll(function(){
	  //var sticky = $('.main'),
	    var  scroll = $(window).scrollTop();

	  if (scroll >= stickyOffset) {
	  	//sticky.addClass('fixed');
	  	$('.large-screen #steps .pieces').css({'margin-top': navHeight*2 });
	  	$('.large-screen nav').css('position','fixed');
	  	

	  }
	  else {
	  	//sticky.removeClass('fixed');
	  	$('.large-screen nav').css('position','static');
	  	$('.large-screen #steps .pieces').css({'margin-top': 0 });
	  	//$('#steps').css({'margin-top': 0, 'padding-top':0});
		}
	});

	/*$('nav a').click(function(e){     
        e.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });*/

$('nav a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

})();

rm.hasRunAccordion = false;
rm.hasRunTabs = false;
rm.mq = '';

rm.mediaQuery = (function() {
	'use strict';

  	

  	var bodyItem= $('body');
  	var mqClass= $('#media-query');


	$(window).on('resize', function () {
	    
	    if (mqClass.css('width') === '1px') {
	    	
		    bodyItem.removeClass().addClass('error');
		
		} else if (mqClass.css('width') === '2px') {

			rm.mq = 'large';

		    bodyItem.removeClass().addClass('large-screen');
		    $('#steps .inner').removeClass('accordion').addClass('pieces');
		    $('#videos .inner').removeClass('accordion').addClass('tabs');
		    
		    rm.tabs();
			rm.puzzle();
	

		} else if (mqClass.css('width') === '3px') {

			rm.mq = 'small';

			$('#videos .tile').show();
			
			bodyItem.removeClass().addClass('small-screen');
		    $('#steps .inner').addClass('accordion').removeClass('pieces');
		    $('#videos .inner').addClass('accordion').removeClass('tabs');
		    
		    rm.accordion();
			
		} 

	}).resize();

  
}());