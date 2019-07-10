$( function() {
	
	var $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 1000);
		return false;
	});
	
	let modal = $( 'div.modal' ),
		btn = $( '.btn:contains("Оставить заявку")' ),
		modal_close = $( '.modal-close' );
	
	btn.click( function() {
		modal.toggleClass( 'modal_active' );
	});
	modal_close.click( function() {
		modal.toggleClass( 'modal_active' );
	});
	
	$( '.slider' ).slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: true,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
	});
	
});