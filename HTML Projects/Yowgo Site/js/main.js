var $sections = $('section');
var $header =  $('header');
var headerOffset = $header.outerHeight();
var $win = $(window);
var $doc = $('document');
function scrollToElm($elm) {
	if($('html,body').is('animated')) {
		return;
	}
	$('html,body').animate({
		scrollTop: $elm.offset().top - headerOffset
	}, 300);
}
function onScrollWin(timer) {
	var $self = $win;
	var timer = timer || 300;
	setTimeout(function(){
		var scrollTop = $self.scrollTop() + headerOffset;
		$.each($sections, function(){
			var currArea = ($(this).offset().top + $(this).outerHeight());
			if(scrollTop >= $(this).offset().top && scrollTop < currArea) {
				$('a[data-name='+$(this).attr('id')+']').addClass('current');
			}else {
				$('a[data-name='+$(this).attr('id')+']').removeClass('current');	
			}
		});
	}, timer);
}
$('a[data-name]').bind('click', function(){
	$('a[data-saved-current]').removeAttr('data-saved-current');
	$(this).addClass('current');
	scrollToElm($('#' + $(this).attr('data-name')));
	return false;
}).hover(function(){
	$('.current').attr('data-saved-current', true).removeClass('current');
	$(this).addClass('current');
}, function(){
	if(!$('a[data-saved-current]').length) {
		return;
	}
	$('.current').removeClass('current');
	$('a[data-saved-current]').addClass('current').removeAttr('data-saved-current');
})
$win.bind('scroll', function(e){
	onScrollWin();
	if($(this).scrollTop() > 0) {
		$header.addClass('scrolled');
	}else {
		$header.removeClass('scrolled');
	}
}).resize(function(){
	headerOffset = $header.outerHeight();
	onScrollWin(0);
	updateInnerSlideWidth();
});
var $slideOuterWrap  = $('#carouselWindow');
var $slideInnerWrap = $('#carouselHero');
var $slideItems = $('.carouselItem');
var curSlide = 0;
var init = true;
function updateInnerSlideWidth() {
	$slideInnerWrap.width($slideItems.length * $slideOuterWrap.outerWidth());
}
(function onloadRunner() {
	updateInnerSlideWidth();
	onScrollWin();
})();
function goToSlide(direction) {
	var slideWrapWidth = $slideInnerWrap.outerWidth();
	var slideItemWidth = $slideOuterWrap.outerWidth();
	if($slideInnerWrap.is(':animated')) {
		return;
	}
	if(direction) { // next slide
		if(curSlide == $slideItems.length - 1) {
			curSlide = 0;
		}else {
			curSlide++;
		}
	}else { //prev slide
		if(curSlide == 0) {
			curSlide = $slideItems.length - 1;
		}else {
			curSlide--;
		}
	}
	init = true;
	$slideInnerWrap.animate({
		left: - (curSlide * slideItemWidth)
	})
}
function goToPrevSlide() {
	goToSlide(0);
}
function goToNextSlide() {
	goToSlide(1);
}
$('.carouselNav').bind('click', function(){
	var direction = $(this).attr('slider-control-dir');
	if(direction == 'left') {
		goToPrevSlide();
	}else {
		goToNextSlide();
	}
});