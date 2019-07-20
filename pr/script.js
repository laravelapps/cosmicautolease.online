/************Document Ready Functions************/

jQuery(document).ready(function () {
	
	// Marketo contact page form submit
	
	var MarketoContactSubmit = (function () {
		
		var _marketoFields = {
				"FirstName" : "",
			    "LastName" : "",
			    "Company" : "",
			    "Email" : "",
			    "Business_Phone__c" : "",
			    "whatDoYouNeed" : "",
			    "ifOther" : "",
			    "questionsorComments" : ""
			},
			_marketoForm;
		
		var _setField = function (input) {
			var value = escape(input.value);
			switch (input.name) {
				case 'first-name':
					_marketoFields['FirstName'] = value;
					break;
				case 'last-name':
					_marketoFields['LastName'] = value;
					break;
				case 'company-name':
					_marketoFields['Company'] = value;
					break;
				case 'your-email':
					_marketoFields['Email'] = value;
					break;
				case 'phone-number':
					_marketoFields['Business_Phone__c'] = value;
					break;
				case 'direct-inquiry':
					_marketoFields['whatDoYouNeed'] = value;
					break;
				case 'marked-other':
					_marketoFields['ifOther'] = value;
					break;
				case 'your-message':
					_marketoFields['questionsorComments'] = value;
					break;
					
			};
		}
	
		var _getMarketoForm = function () {
			if (MktoForms2.allForms()[0] === undefined) {
				setTimeout(function(){
					_getMarketoForm();
				}, 250);
			} else {
				_marketoForm = MktoForms2.allForms()[0];
				_setSubmitEvent();
			}
		};
		var _setSubmitEvent = function () {
			$('body').on( 'wpcf7mailsent', function( event ) {
				var inputs = event.detail.inputs;
				for ( var i = 0; i < inputs.length; i++ ) {
					_setField(inputs[i]);
				}
				_marketoForm.addHiddenFields(_marketoFields);
				_marketoForm.submit();
			});
		};
		
		var _init = function () {
			_getMarketoForm();
		};
		
		return {
			init: _init
		};
	})();
	if ($('body').hasClass('page-template-page-contact')) {
		MarketoContactSubmit.init();
	}
	
	
	/************LOAD MORE ACTIVE************/
	
	$('.alm-load-more-btn').click(function(e) {
		$('.grid.alm-listing').addClass('active');
	});
	
	/************TABS************/
	
	// Show only the Contact Information FAQ items on page load, per client request
	var startTab = 'cat-contact-information';
	$('.tabs-nav li.' + startTab).addClass('active');
	$('.faqs').find('.tab-content.'+ startTab).show();

	$('.tabs-nav li').click(function(e) {
		
		active = $(this);
	    
	    if(!active.hasClass('active')) {
	    	$tabClass = active.attr('class');
	    	$('.tabs-nav li').removeClass('active');
			active.addClass('active');
			$('.faqs').find('.tab-content').hide();
			$('.faqs').find('.tab-content.'+$tabClass).show();
		}
	});
	
	/************ACCORDIONS************/
	
	$('.accordions button').click( function(e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
        var status = $(this).parents('li').hasClass('active');
		
		if(status){
	        $(this).parents('li').removeClass('active');
      	}else{
	      	$('.accordions li').removeClass('active');
        	$(this).parents('li').addClass('active');
		}
	});

	
	/************POPUP CARDS************/
	
	$('.open-popup').click(function(e) {

		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');

		return false;
	});
	
	$('.close-popup').click(function(e) {
		
		$(this).parents('li').removeClass('active');

		return false;
	});
	
	/************FANCY SEARCH BUTTON SHOW************/
	
	$('.searchform input').keyup(function(){
	   if($.trim(this.value).length > 0)
	       $('.searchform button').addClass('active');
	    else
	       $('.searchform button').removeClass('active');
	});
	
	/************SLIDERS************/
	
	// News Carousel w/ custom range slider
	
	$(function() {
		var $owl = $('.owl-carousel');

		// Add some custom data attributes and event handling before instantiating the slider.
		// This will allow us to click on a specific slide to advance to it.
		$owl.children().each( function( index ) {
			$(this).attr( 'data-position', index );
		});

		$owl.owlCarousel({
			items: 3,
			slideBy: 1,
			dots: false,
			stagePadding: 40,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				1024: {
					items: 3
				},
				1400: {
					items: 4
				}
			},
		});

		function addShadow( index ) {
			if ( index === 13) {
				$('.owl-item.active').eq(1).children('.slide').addClass('shadow');
			}
			else if ( index === 14 ) {
				$('.owl-item.active').last().children('.slide').addClass('shadow');
			}
			else {
				$('.owl-item.active').first().children('.slide').addClass('shadow');
			}
		}

		$('.owl-item > div').click(function() {
			console.log($(this).data('position') );
			$owl.trigger('to.owl.carousel', $(this).data( 'position' ) );
			addShadow( $(this).data( 'position' ) );
		});

		$('.owl-item').eq(0).addClass('wide');


		var $slider = $( ".slider" );
		var handle = $slider.children('.ui-slider-handle');
		var handleWidth = handle.width();
		var marginLeft;


		$slider.slider({
			range: "max",
			min : 0,
			max : 14,
			slide: function(event, ui) {
				$owl.trigger('to.owl.carousel', ui.value);
				$('.owl-item .slide').removeClass('shadow');
				addShadow(ui.value);

				// Don't allow the handle to overhang the end of the slider track
				if ( ui.value === 14 ) {
					marginLeft = 0 - handleWidth;
				} else {
					marginLeft = 0;
				}

				handle.css('margin-left', marginLeft);
			}
		});



	});
	
	// Testimonials carousel w/ custom 3D functionality
	
	$('.testimonials .carousel').slick({
		variableWidth: true,
		nextArrow: '<button type="button" class="slick-arrow slick-next"><span class="accessibility">Next</span><i class="fas fa-angle-right"></i></button>',
		prevArrow: '<button type="button" class="slick-arrow slick-prev"><span class="accessibility">Previous</span><i class="fas fa-angle-left"></i></button>',
		centerMode:    true,
		centerPadding: '100px',
		slidesToShow:  3,
		arrows:        true,
		responsive: [
		    {
		      breakpoint: 882,
		      settings: {
		        arrows: false,
		        centerMode: false,
		        slidesToShow: 1
		      }
		    }
		]
	}).on('beforeChange', () => {
		removeSlickClasses();
		setTimeout(addSlickClasses, 10);
	});
	
	function removeSlickClasses() {
		$('.slick-slide').removeClass(`
			slick-slide-prev
			slick-slide-next
		`);
	}
	
	function addSlickClasses() {
		const $current = $('.slick-current');
		$current.nextAll().each(function() {
			$(this).addClass('slick-slide-next');
		});
		$current.prevAll().each(function() {
			$(this).addClass('slick-slide-prev');
		});
	}
	
	$(document).ready(addSlickClasses);
	
	/************LIGHTBOXES************/
	
	$('.video-lightbox').magnificPopup({
		type: 'iframe',
		iframe: {
			patterns: {
				youtube: {
					src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&showinfo=0'
				}
			}
		}
	});
	
	/************DESKTOP MENU************/
	
	// Dropdown
		
	$('nav .dropdown').hover(function(e) {
		
		var classes = $(this).attr('class');
		var menuClass = classes.match(/drop\-\d+/gi)[0];
		
		var status = $(this).hasClass('active');
		if(status){
			// hide everything
			
			$('.popup-nav li').removeClass('active'); 
			$('header').removeClass('active');
			$('nav .dropdown > a').removeClass('active');
			$('.popup-nav').attr("aria-expanded","false");
		}else{
			
			// turn everything on
			$('.popup-nav li, #menu-main-top a').removeClass('active');
			$('header').addClass('active');
			$('.popup-nav .' + menuClass).addClass('active');
			$('nav ' + menuClass +' > a').addClass('active');
			$('.popup-nav').attr("aria-expanded","true");
		}
	});
	
	function desktopOpen() {
	
		$('header nav').mouseleave(function(e) {
		
	        $('.popup-nav li').removeClass('active'); 
			$('header').removeClass('active');
			$('nav .dropdown > a').removeClass('active');
			$('.popup-nav').attr("aria-expanded","false");
		});
	}
	
	function desktopClose() {
		// Avoid JS error if these are checked before binding
		if ( 'undefined' !== typeof(mouseleave) ) {
			$('header nav').unbind(mouseleave);
		}
		if ( 'undefined' !== typeof(hover) ) {
			$('nav .dropdown').unbind(hover);
		}
	}
	
	/************MOBILE MENU************/
				
	var menu = $('.mobile-menu');
	var header = $('header');
		
	function mobileFiltering() {
		
		menu.click( function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
	        var status = header.hasClass('active');
	      if(status){
	        header.removeClass('active');
	        $('.popup-nav li').removeClass('active'); 
			$('header').removeClass('active');
			$(this).removeClass('active');
			$('.popup-nav').attr("aria-expanded","false");
			$('#main').focus();
			$('html').removeClass('active');
	      }else{
	        header.addClass('active');
	        $('.popup-nav').attr("aria-expanded","true");
	        $('html').addClass('active');
	      }
	  });
	}
	
	function mobileDrops() {
		
		// Add drop links
		
		$('header li.menu-item-has-children').each(function() {
			$(this).append('<a class="open-children" href="#"><span class="accessibility">View Dropdown</span></a>');
		});
		
		// On click
		
		$('.open-children').click( function(e) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			var link = $(this).parent();
	        var status = link.hasClass('active');
	      if(status){
	        link.removeClass('active');
	      }else{
	        link.addClass('active');
	      }
	  });
	}
	
	// Kill mobile menu
	
	function endMobile() {
		menu.unbind();
		header.removeClass('active');
		$('.popup-nav > li > .menu > li > a').unbind();
		$('.popup-nav > li > .menu > li').unbind().removeClass('active');
	}
	
	// Active mobile menu
	
	if ($(window).width() < 883) {
	    mobileFiltering();
	    mobileDrops();
	    desktopClose();
	} else {
		desktopOpen();
		endMobile();
	}
	
	$( window ).resize(function() {
	    if($(window).width() < 883 ) {
	        mobileFiltering();
	        mobileDrops();
	        desktopClose();
	    } else {
		    desktopOpen();
		    endMobile();
	    }
	});

	// Highlight current top level nav item

	if ( $('.current-menu-item').length > 0 ) {
		var navParentClasses = $('.current-menu-item').parents('.flex-container').attr('class').split(' ');
		var currentDropClass = null;
		
		for (var i = 0; i < navParentClasses.length; i++) {
			if (navParentClasses[i].slice(0,5) === 'drop-') {
				currentDropClass = navParentClasses[i];
			}
		}
		
		$('#menu-main li.' + currentDropClass + ' > a').css('color', 'var(--lightGreen)');
	}
	
});
