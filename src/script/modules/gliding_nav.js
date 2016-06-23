(function gliding() {

	$('.menu__link').on('click', function(event) {
		event.preventDefault();
		var toSection = $(this).attr('href');
		var headerHeight = $('.header__wrap').outerHeight();
		var topPosition = ((Math.round(($(toSection).offset().top))) - headerHeight);
		console.log(topPosition);
		$('html, body').animate({ scrollTop: topPosition}, 800);
		// $('html, body').animate({ scrollTop: (($(toSection).offset().top) - headerHeight)}, 800);
	})


		

})();