(function() {
	var p = $('.slider-price-xs');

	p.prepareForRun = function() {
		p.bulletClone = p.find('.mobile-menu-price__item');
		for(var i = 0; i<p.slides.length-1; i++){
			p.bulletClone.clone(true).appendTo(p.menu);
		}
		p.bullets = p.find('.mobile-menu-price__button');
		p.slideMove();
	}
	p.switchBullet = function() {
		p.currentSlideNumber 	= p.bullets.index(this);
		p.slideMove(p.currentSlideNumber);
	}
	p.slideMove = function() {
		var widthToMove = p.slideWidth * p.currentSlideNumber;
		p.band.animate({left : -widthToMove}, 500);
		p.bullets.removeClass('mobile-menu-price__button_current');
		p.bullets.eq(p.currentSlideNumber).addClass('mobile-menu-price__button_current');
	}
	p.updateWidth = function() {
		p.slideWidth 	= p.slides.outerWidth();
		var updateWidth = p.slideWidth * p.currentSlideNumber;
		p.band.css({left: -updateWidth});
	}
	p.data = function() {
		p.slides 				= p.find('.slider-price-xs__slide');
		p.slideWidth 			= p.slides.outerWidth();
		p.band 					= p.find('.slider-price-xs__slides');
		p.menu 					= p.find('.mobile-menu-price');
		p.currentSlideNumber 	= 0;
		p.prepareForRun();

		p.bullets.on('click', p.switchBullet);
		$(window).resize(p.updateWidth);
	}
	$(document).ready(p.data);
})();