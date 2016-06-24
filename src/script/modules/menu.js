(function() {
	"use strict";

	var m = $('.header__wrap');

	m.toggleMenu = function () {
		m.menu.slideToggle(200);
		m.toggleClass('header__wrap_open');
	}
	m.glidingNav = function(event) {
		event.preventDefault();
		m.item.removeClass('menu__item_current');
		var toSection 		= $(this).attr('href'),
			currentLink 	= m.link.index(this),
			headerHeight 	= m.outerHeight(),
			menuHeight 		= m.menu.outerHeight(),
			topPosition 	= ((Math.round(($(toSection).offset().top))) - headerHeight);
		if((document.documentElement.clientWidth) < 970){
			topPosition += menuHeight;	
			m.menu.slideUp();
		}
		m.removeClass('header__wrap_open');
		$('html, body').animate({ scrollTop: topPosition}, 800);
		m.item.eq(currentLink).addClass('menu__item_current');	
	}
	m.scrollPage = function() {
		m.addClass('header__wrap_scroll');
	}
	m.resizeMenu = function (){
		m.menu.attr('style', '');
		m.removeClass('header__wrap_open');
	}
	m.data = function() {
		m.button 	= m.find('.button');
		m.menu 		= m.find('.menu');
		m.item		= m.find('.menu__item');
		m.link 		= m.find('.menu__link');
		
		m.button.on('click', m.toggleMenu);
		m.link.on('click', m.glidingNav);
		$(window).scroll(m.scrollPage);
		$(window).resize(m.resizeMenu);
	}
	$(document).ready(m.data);
})();