$(document).ready(function() {
	/* 头部大搜索框更换 */
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
	/* 放大镜 */
	$.fn.jqueryzoom = function(options) {
		var settings = {
			xzoom: 200, //zoomed width default width
			yzoom: 200, //zoomed div default width
			offset: 10, //zoomed div default offset
			position: "right", //zoomed div default position,offset position is to the right of the image
			lens: 1, //zooming lens over the image,by default is 1;
			preload: 1
		};
		if(options) {
			$.extend(settings, options);
		}
		var noalt = '';
		$(this).hover(function() {
			var imageLeft = this.offsetLeft;
			var imageRight = this.offsetRight;
			var imageTop = $(this).get(0).offsetTop;
			var imageWidth = $(this).children('img').get(0).offsetWidth;
			var imageHeight = $(this).children('img').get(0).offsetHeight;
			noalt = $(this).children("img").attr("alt");
			var bigimage = $(this).children("img").attr("jqimg");
			$(this).children("img").attr("alt", '');
			if($("div.zoomdiv").get().length == 0) {
				$(this).after("<div class='zoomdiv'><img class='bigimg' src='" + bigimage + "'/></div>");
				$(this).append("<div class='jqZoomPup'>&nbsp;</div>");
			}
			if(settings.position == "right") {
				if(imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width) {
					leftpos = imageLeft - settings.offset - settings.xzoom;
				} else {
					leftpos = imageLeft + imageWidth + settings.offset;
				}
			} else {
				leftpos = imageLeft - settings.xzoom - settings.offset;
				if(leftpos < 0) {
					leftpos = imageLeft + imageWidth + settings.offset;
				}
			}
			$("div.zoomdiv").css({
				top: imageTop,
				left: leftpos
			});
			$("div.zoomdiv").width(settings.xzoom);
			$("div.zoomdiv").height(settings.yzoom);
			$("div.zoomdiv").show();
			if(!settings.lens) {
				$(this).css('cursor', 'crosshair');
			}
			$(document.body).mousemove(function(e) {
				mouse = new MouseEvent(e);
				/*$("div.jqZoomPup").hide();*/
				var bigwidth = $(".bigimg").get(0).offsetWidth;
				var bigheight = $(".bigimg").get(0).offsetHeight;
				var scaley = 'x';
				var scalex = 'y';
				if(isNaN(scalex) | isNaN(scaley)) {
					var scalex = (bigwidth / imageWidth);
					var scaley = (bigheight / imageHeight);
					$("div.jqZoomPup").width((settings.xzoom) / scalex);
					$("div.jqZoomPup").height((settings.yzoom) / scaley);
					if(settings.lens) {
						$("div.jqZoomPup").css('visibility', 'visible');
					}
				}
				xpos = mouse.x - $("div.jqZoomPup").width() / 2 - imageLeft;
				ypos = mouse.y - $("div.jqZoomPup").height() / 2 - imageTop;
				if(settings.lens) {
					xpos = (mouse.x - $("div.jqZoomPup").width() / 2 < imageLeft) ? 0 : (mouse.x + $("div.jqZoomPup").width() / 2 > imageWidth + imageLeft) ? (imageWidth - $("div.jqZoomPup").width() - 2) : xpos;
					ypos = (mouse.y - $("div.jqZoomPup").height() / 2 < imageTop) ? 0 : (mouse.y + $("div.jqZoomPup").height() / 2 > imageHeight + imageTop) ? (imageHeight - $("div.jqZoomPup").height() - 2) : ypos;
				}
				if(settings.lens) {
					$("div.jqZoomPup").css({
						top: ypos,
						left: xpos
					});
				}
				scrolly = ypos;
				$("div.zoomdiv").get(0).scrollTop = scrolly * scaley;
				scrollx = xpos;
				$("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex;
			});
		}, function() {
			$(this).children("img").attr("alt", noalt);
			$(document.body).unbind("mousemove");
			if(settings.lens) {
				$("div.jqZoomPup").remove();
			}
			$("div.zoomdiv").remove();
		});
		count = 0;
		if(settings.preload) {
			$('body').append("<div style='display:none;' class='jqPreload" + count + "'>sdsdssdsd</div>");
			$(this).each(function() {
				var imagetopreload = $(this).children("img").attr("jqimg");
				var content = jQuery('div.jqPreload' + count + '').html();
				jQuery('div.jqPreload' + count + '').html(content + '<img src=\"' + imagetopreload + '\">');
			});
		}
	};

	//图片预览小图移动效果,页面加载时触发
	var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 4; //设置每次显示图片的个数量
	var moveNum = 1; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
	var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
	var moveLength = (scrollItems.eq(0).width() + 16) * moveNum; //计算每次移动的长度
	var countLength = (scrollItems.length - viewNum) * (scrollItems.eq(0).width() + 16); //计算总长度,总个数*单个长度

	console.log(countLength);
	//下一张
	$(".spec-scroll .next").bind("click", function() {
		if(tempLength < countLength) {
			if((countLength - tempLength) > moveLength) {
				scrollDiv.animate({
					left: "-=" + moveLength + "px"
				}, moveTime);
				tempLength += moveLength;
			} else {
				scrollDiv.animate({
					left: "-=" + (countLength - tempLength) + "px"
				}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
	});
	//上一张
	$(".spec-scroll .prev").bind("click", function() {
		if(tempLength > 0) {
			if(tempLength > moveLength) {
				scrollDiv.animate({
					left: "+=" + moveLength + "px"
				}, moveTime);
				tempLength -= moveLength;
			} else {
				scrollDiv.animate({
					left: "+=" + tempLength + "px"
				}, moveTime);
				tempLength = 0;
			}
		}
	});
	/* 放大镜结束 */

	/* 购买点击显示红框 */
	$('.ncs-key').find('dl').find('a').click(function() {
		$(this).toggleClass('selected');
	});
	/* 点击数量增加 */
	var $sl = $('.num-input').val();
	console.log($sl);
	$('.num-add').click(function() {
		//		alert($(this).siblings('.numb').val());
		var oldValue = parseInt($(this).siblings('.num-input').val());
		oldValue++;
		$(this).siblings('.num-input').val(oldValue);
	});
	$('.num-reduce').click(function() {
		var oldValue = parseInt($(this).siblings('.num-input').val());
		if(oldValue > 0) {
			oldValue--;
			$(this).siblings('.num-input').val(oldValue);
		}
	});

	/* 商品详情页中间内容更换 */
	$('.details_c').find('.choose').find('li').mousedown(function() {
		$('.details_c').find('.choose').find('li').css({
			"border-bottom": "0px solid #f9f9f9",
			"background": "#f9f9f9",
			"border-top": "0px solid red"
		});
		$(this).css({
			"border-bottom": "1px solid #fff",
			"background": "#fff",
			"border-top": "2px solid red"
		});
		console.log($(this).index());
		$(this).parent().parent().next('.com').find('.comm').eq($(this).index()).css(
			"display", "block"
		);
		$(this).parent().parent().next('.com').find('.comm').eq($(this).index()).siblings().css(
			"display", "none"
		);

	});
	/* 商品评价内容更换 */
	$('.details_c').find('.commod_c').find('.commod_b').find('.commod_io').find('li').mousedown(function() {
		$('.details_c').find('.commod_c').find('.commod_b').find('.commod_io').find('li').css({
			"border-bottom": "0px solid #f9f9f9",
			"background": "#f9f9f9",
			"border-top": "0px solid red"
		});
		$(this).css({
			"border-bottom": "1px solid #fff",
			"background": "#fff",
			"border-top": "2px solid red"
		});
	});
	/* 商品详情在顶部停留开始 */
	var $jl = $('.details_c ').find('.choose').find('ul');
	console.log($jl);
	$(window).scroll(function() {
		if($jl.scrollTop() > 0) {
			$('.details_c ').find('.choose').find('ul').animate({
				position: "fixed",
				top: "0",
				left: '0'
			});
			console.log("到");
		} else {
			$('.details_c ').find('.choose').find('ul').animate({
				position: "relative",
				top: "0",
				left: '0'
			});
			console.log("不到");
		}
	});
	/* 商品详情在顶部停留结束 */

});

function MouseEvent(e) {
	this.x = e.pageX
	this.y = e.pageY

}
//鼠标经过预览图片函数
function preview(img) {
	$("#preview .jqzoom img").attr("src", $(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg", $(img).attr("bimg"));
}
//图片放大镜效果
$(function() {
	$(".jqzoom").jqueryzoom({
		xzoom: 380,
		yzoom: 410
	});
});