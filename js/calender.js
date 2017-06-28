function HS_DateAdd(e, t, a) {
	if(t = parseInt(t), "string" == typeof a) var a = new Date(a.split("-")[0], a.split("-")[1], a.split("-")[2]);
	if("object" == typeof a) var a = a;
	switch(e) {
		case "y":
			return new Date(a.getFullYear() + t, a.getMonth(), a.getDate());
		case "m":
			return new Date(a.getFullYear(), a.getMonth() + t, checkDate(a.getFullYear(), a.getMonth() + t, a.getDate()));
		case "d":
			return new Date(a.getFullYear(), a.getMonth(), a.getDate() + t);
		case "w":
			return new Date(a.getFullYear(), a.getMonth(), 7 * t + a.getDate())
	}
}

function checkDate(e, t, a) {
	var n = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"],
		l = "";
	return e % 4 == 0 && (n[1] = "29"), l = a > n[t] ? n[t] : a
}

function WeekDay(e) {
	var t;
	return "string" == typeof e && (t = new Date(e.split("-")[0], e.split("-")[1], e.split("-")[2])), "object" == typeof e && (t = e), t.getDay()
}

function HS_calender() {
	var e = "",
		t = "";
	t += "<style type='text/css'>", t += ".calender { width:270px; height:auto; font-size:12px; margin-right:14px; background-color:#fff; border:1px solid #ccc; padding:1px}", t += ".calender ul {list-style-type:none; margin:0; padding:0;}", t += ".calender .day { background-color:#EDF5FF; height:30px;}", t += ".calender .day li,.calender .date li{ float:left; width:14%; height:30px; line-height:30px; text-align:center}", t += ".calender li a { text-decoration:none; font-family:Tahoma; font-size:11px; color:#333}", t += ".calender li a:hover { color:#f36; text-decoration:underline}", t += ".calender li a.hasArticle {font-weight:bold; color:#f60 !important}", t += ".lastMonthDate, .nextMonthDate {color:#bbb;font-size:11px}", t += ".selectThisYear a, .selectThisMonth a{text-decoration:none; margin:0 2px; color:#333; font-weight:bold}", t += ".calender .LastMonth, .calender .NextMonth{ text-decoration:none; color:#333; font-size:18px; line-height:30px;}", t += ".calender .LastMonth { float:left;}", t += ".calender .NextMonth { float:right;}", t += ".calenderBody {clear:both}", t += ".calenderTitle {text-align:center;height:30px; line-height:30px; clear:both}", t += ".today { background-color:#ececec;border:1px solid #ccc; padding:5px 10px;}", t += ".today a { color:#f30; }", t += ".calenderBottom {clear:both; border-top:1px solid #ddd; padding: 3px 0; text-align:left; line-height:20px; height: 20px;}", t += ".calenderBottom a {text-decoration:none; margin:0 2px !important; font-weight:bold; color:#333}", t += ".calenderBottom a.closeCalender{float:right}", t += ".closeCalenderBox {float:right; border:1px solid #333; background:#fff; font-size:9px; width:11px; height:11px; line-height:11px; text-align:center;overflow:hidden; font-weight:normal !important}", t += "</style>";
	var a;
	if("string" == typeof arguments[0]) {
		selectDate = arguments[0].split("-");
		var n = selectDate[0],
			l = parseInt(selectDate[1]) - 1 + "",
			o = selectDate[2];
		a = new Date(n, l, o)
	} else "object" == typeof arguments[0] && (a = arguments[0]);
	var r = HS_DateAdd("d", "-1", a.getFullYear() + "-" + a.getMonth() + "-01").getDate(),
		s = WeekDay(a.getFullYear() + "-" + a.getMonth() + "-01"),
		c = HS_DateAdd("d", "-1", a.getFullYear() + "-" + (parseInt(a.getMonth()) + 1).toString() + "-01"),
		d = c.getDate(),
		h = c.getDay(),
		p = new Date;
	for(today = p.getFullYear() + "-" + p.getMonth() + "-" + p.getDate(), i = 0; i < s; i++) e = "<li class='lastMonthDate'>" + r + "</li>" + e, r--;
	for(i = 1; i <= d; i++) {
		var g = parseInt(a.getMonth()) + 1 < 10 ? "0" + (parseInt(a.getMonth()) + 1) : parseInt(a.getMonth()) + 1,
			f = i < 10 ? "0" + i : i;
		if(today == a.getFullYear() + "-" + a.getMonth() + "-" + i) {
			var u = a.getFullYear() + "-" + (parseInt(a.getMonth()) + 1 > 10 ? parseInt(a.getMonth()) + 1 : "0" + (parseInt(a.getMonth()) + 1)) + "-" + (i > 10 ? i : "0" + i);
			e += "<li><a href=javascript:void(0) class='today' onclick='_selectThisDay(this)' title='" + a.getFullYear() + "-" + g + "-" + f + "'>" + i + "</a></li>"
		} else e += "<li><a href=javascript:void(0) onclick='_selectThisDay(this)' title='" + a.getFullYear() + "-" + g + "-" + f + "'>" + i + "</a></li>"
	}
	var v = 1;
	for(i = h; i < 6; i++) e += "<li class='nextMonthDate'>" + v + "</li>", v++;
	e += t;
	var x = "<a href='javascript:void(0)' class='NextMonth' onclick=HS_calender(HS_DateAdd('m',1,'" + a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate() + "'),this) title='Next Month'>&gt;</a>";
	if(x += "<a href='javascript:void(0)' class='LastMonth' onclick=HS_calender(HS_DateAdd('m',-1,'" + a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate() + "'),this) title='Previous Month'>&lt;</a>", x += "<span class='selectThisYear'><a href='javascript:void(0)' onclick='CalenderselectYear(this)' title='Click here to select other year' >" + a.getFullYear() + "</a></span>年<span class='selectThisMonth'><a href='javascript:void(0)' onclick='CalenderselectMonth(this)' title='Click here to select other month'>" + (parseInt(a.getMonth()) + 1).toString() + "</a></span>月", !(arguments.length > 1)) {
		var M = t + "<div class='calender'><div class='calenderTitle'>" + x + "</div><div class='calenderBody'><ul class='day'><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class='date' id='thisMonthDate'>" + e + "</ul></div><div class='calenderBottom'><a href='javascript:void(0)' class='closeCalender' onclick='closeCalender(this)'>&times;</a><span><span><a href=javascript:void(0) onclick='_selectThisDay(this)' title='" + u + "'>Today</a></span></span></div></div>";
		return M
	}
	arguments[1].parentNode.parentNode.getElementsByTagName("ul")[1].innerHTML = e, arguments[1].parentNode.innerHTML = x
}

function _selectThisDay(e) {
	var t = e.parentNode.parentNode.parentNode.parentNode.parentNode;
	t.targetObj.value = e.title, t.parentNode.removeChild(t)
}

function closeCalender(e) {
	var t = e.parentNode.parentNode.parentNode;
	t.parentNode.removeChild(t)
}

function CalenderselectYear(e) {
	var t = "",
		a = e.innerHTML;
	for(i = 1970; i <= 2020; i++) t += i == a ? "<option value=" + i + " selected>" + i + "</option>" : "<option value=" + i + ">" + i + "</option>";
	t = "<select onblur='selectThisYear(this)' onchange='selectThisYear(this)' style='font-size:11px'>" + t + "</select>", e.parentNode.innerHTML = t
}

function selectThisYear(e) {
	HS_calender(e.value + "-" + e.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML + "-1", e.parentNode)
}

function CalenderselectMonth(e) {
	var t = "",
		a = e.innerHTML;
	for(i = 1; i <= 12; i++) t += i == a ? "<option value=" + i + " selected>" + i + "</option>" : "<option value=" + i + ">" + i + "</option>";
	t = "<select onblur='selectThisMonth(this)' onchange='selectThisMonth(this)' style='font-size:11px'>" + t + "</select>", e.parentNode.innerHTML = t
}

function selectThisMonth(e) {
	HS_calender(e.parentNode.parentNode.getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML + "-" + e.value + "-1", e.parentNode)
}

function HS_setDate(e) {
	var t = document.createElement("span");
	t.innerHTML = HS_calender(new Date), t.style.position = "absolute", t.style.left = "0", t.style.top = "39px", t.targetObj = e, e.parentNode.insertBefore(t, e.nextSibling)
};