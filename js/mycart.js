$(document).ready(function() {
	/* 数量变化 */
	var $sl = $('.numb').val();
	console.log($sl);
	$('.spriter').click(function() {
		//		alert($(this).siblings('.numb').val());
		var oldValue = parseInt($(this).siblings('.numb').val());
		oldValue++;
		$(this).siblings('.numb').val(oldValue);
	});
	$('.spritel').click(function() {
		var oldValue = parseInt($(this).siblings('.numb').val());
		if(oldValue > 0) {
			oldValue--;
			$(this).siblings('.numb').val(oldValue);
		}
	});
	
	/* 钱数变化 */
	
	
	
	
	

});