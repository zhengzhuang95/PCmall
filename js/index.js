$(document).ready(function() {
	/* 搜索切换 */
	$('#search-bar').find('.search_bar_t').find('a').click(function() {
		$(this).addClass('change').siblings().removeClass('change');
	});
	$('.shops').click(function() {
		$('.entering').removeAttr("placeholder");
		$('.entering').attr("placeholder", "请输入您要搜索的店铺");
	});
	$('.sp').click(function() {
		$('.entering').removeAttr("placeholder");
		$('.entering').attr("placeholder", "请输入您要搜索的商品");
	});

	/* nav详细页 */
	$('.nav ul li').hover(
		function() {
			$(this).css('background', '#999395');
			$(this).parent().siblings('.nav_right').find('.cate_part').eq($(this).index()).css('display', 'block');
		},
		function() {
			$(this).css('background', '');
			$(this).parent().siblings('.nav_right').find('.cate_part').eq($(this).index()).css('display', 'none');
		}
	);
	$('.nav_right .cate_part').hover(
		function() {
			$(this).css('display', 'block');
			$(this).parent().siblings('ul').find('li').eq($(this).index()).css('background', '#999395');
		},
		function() {
			$(this).css('display', 'none');
			$(this).parent().siblings('ul').find('li').eq($(this).index()).css('background', '');
		}
	);
	/* banner图 */
	$(".prev,.next").hover(function() {
		$(this).stop(true, false).fadeTo("show", 0.9);
	}, function() {
		$(this).stop(true, false).fadeTo("show", 0.4);
	});

	$(".banner-box").slide({
		titCell: ".hd ul",
		mainCell: ".bd ul",
		effect: "fold",
		interTime: 3500,
		delayTime: 500,
		autoPlay: true,
		autoPage: true,
		trigger: "click"
	});
	/* banner图右边信息 */
	$('#infor-nav').find('li').mousemove(function() {
		$(this).addClass('current').siblings().removeClass('current');
		$(this).parent().siblings().find('div').eq($(this).index()).css('display', 'block').siblings().css('display', 'none');

	});

});