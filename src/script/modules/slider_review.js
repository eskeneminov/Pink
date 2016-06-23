(function() {
	"use strict";
	var s = $('#slider_reviews_id');
	s.prepareForRun = function() {
		s.bulletClone = s.find('.mobile-menu__item');
		for(var i=0; i<(s.slides.length-1); i++){
			s.bulletClone.clone(true).appendTo(s.mobileMenu);
		}
		s.bullets = s.find('.mobile-menu__button');
		s.firstSlide = s.slides.last().clone().prependTo(s.band).hide();
		s.slides.eq(0).clone().appendTo(s.band);
		s.sliderAutoRun();
	}

	s.sliderAutoRun	= function(){
		s.moveSlider(0);
		s.timer = window.setInterval(s.moveSlider, 3000);
	}

	s.switchToImage = function() {
		window.clearInterval(s.timer);
		var className = $(this).attr('class');

		if(-1 != className.indexOf('mobile-menu__button')){
			s.currentSlideNumber = s.bullets.index(this);
			s.moveSlider(s.currentSlideNumber);
		}
		else if(-1 != className.indexOf('arrows__button_right')){
			s.moveSlider(++s.currentSlideNumber);
		}
		else{
			s.moveSlider(--s.currentSlideNumber);
		}
	}

	s.moveSlider = function(currentSlide) {
		if(typeof currentSlide === 'undefined'){
			currentSlide = ++s.currentSlideNumber;
		}

		var	widthToMove = s.slideWidth * currentSlide,
			fAnimationFinish	= function (){};

		if(currentSlide<0){
			s.band.css({'left' : -s.slideWidth});
			s.firstSlide.show();
			s.currentSlideNumber = s.slides.length-1;
			widthToMove	= 0; 
			fAnimationFinish = function(){
			$(this).css({'left' : -((s.slides.length-1)*s.slideWidth)});
			s.firstSlide.hide();
			}
		}
		else if(currentSlide == s.slides.length){
			s.currentSlideNumber = 0;
			fAnimationFinish = function(){
			$(this).css({'left' : 0});
			}
		}
		s.bullets.removeClass('mobile-menu__button_current');
		s.bullets.eq(s.currentSlideNumber).addClass('mobile-menu__button_current');
		s.band.animate({'left' : -widthToMove}, 600, fAnimationFinish);
	}

	s.resizeUpdateWidth	= function(){
		s.band.stop();
		s.slideWidth	= s.slides.outerWidth();
		s.moveSlider(s.currentSlideNumber);
	}
	s.data = function() {
		s.slides 				= s.find('.slide-review');
		s.mobileMenu 			= s.find('.mobile-menu');
		s.band 					= s.find('.slider-reviews__slides');
		s.arrows 				= s.find('.arrows__button');
		s.slideWidth 			= s.slides.outerWidth();
		s.currentSlideNumber	= 0;
		s.prepareForRun();


		s.arrows.add(s.bullets).on('click', s.switchToImage);
		$(window).resize(s.resizeUpdateWidth);
	}

	$(document).ready(s.data);
})();