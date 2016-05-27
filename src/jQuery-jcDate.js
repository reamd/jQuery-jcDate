/* jQuery - jcDate v1.0 */
"use strict";
(function($, factory){
    if(typeof define === "function") {
        define(['jQuery'],function($){
            factory($);
        });
    }else {
        factory($);
    }
}(jQuery, function($){
    $.fn.jcDate = function(options) {
        var defaults = {
            Class : "",
            Default: "today",
            Event : "click",
            Speed : 100,
            Left : 0,
            Top : 22,
            Format : "-",
            DoubleNum: true,
            Timeout : 100,
            OnChange: function(){}
        };
        options = $.extend(defaults,options);
        return $(this).each(function(idx, item) {
            if($("#jcDate").length == 0){
                $("body").prepend("<div id='jcDate'><input type='hidden' value='' id='dateHideText' /><div id='jcDateTt'><a id='d_prev'>&#9668;</a><div><span></span><b>年</b><samp></samp><b>月</b></div><a id='d_next'>&#9658;</a></div><dl id='jcYeas'></dl><dl id='jcMonth'></dl><div id='jcDayWrap'><dl id='jcDayCon'></dl><div id='jcDateMax'><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul><ul></ul></div><div id='jcDateBtn'><samp>今天</samp><span>清空</span><a id='d_sub'>确定</a><div id='jcTimeWrap'><input type='text' value='' /><label>:</label><input type='text' value='' /></div></div></div></div>");
            }
            var $dateInput = $(item),
                $window = $(window),
                dateObj = new Date(),
                $jcDate = $("#jcDate"),
                $jcDateTt = $("#jcDateTt"),
                inputOffLeft = $(this).offset().left,
                inputOfftop = $(this).offset().top,
                $year = $jcDateTt.find("span"),
                $month = $jcDateTt.find("samp"),
                $b = $jcDateTt.find("b"),
                $jcDateMax = $("#jcDateMax"),
                $weekFrame = $("#jcDayCon"),
                $DateBtn = $("#jcDateBtn"),
                $jcYeas = $("#jcYeas"),
                $jcMonth = $("#jcMonth"),
                $Now = $DateBtn.find("samp"),
                $clear = $DateBtn.find("span"),
                $jcDayWrap = $("#jcDayWrap"),
                $dayFrame = $jcDayWrap.find("ul"),
                $submit = $DateBtn.find("a#d_sub"),
                $HiddenText = $("input#dateHideText"),
                $jcTimeWrap = $("#jcTimeWrap"),
                $hh = $jcTimeWrap.find("input:eq(0)"),
                $mm = $jcTimeWrap.find("input:eq(1)"),
                $d_prev = $("#d_prev"),
                $d_next = $("#d_next"),
            // 获取当前时间
                _year = parseInt(dateObj.getFullYear()),
                _month = dateObj.getMonth() + 1,
                _date = dateObj.getDate(),
                week = dateObj.getDay(),
                days = [ "日","一 ","二 ","三 ","四 ","五 ","六 "],
                _day = days[week],
                _hours = dateObj.getHours(),
                _minutes = dateObj.getMinutes(),
                weekDl = "",
                yearDl = "<dd class='visited'>"+_year+"年"+"</dd>",
                monthDl = "",
                $ul = "",
                _idx = 0,
                defInfo = "",
                getDateCount = function(y, m){
                    return [31, y % 4 == 0 && y % 100 != 0  || y % 400 == 0 ? 29 : 28 ,31,30,31,30,31,31,30,31,30,31][ m+1 ];
                },
                lastYear,
                firstYear,
                w,
                index,
                mA,
                NowY = _year,
                yArr = [],
                mArr = [],
                dtf,
                dtl;
            //函数声明
            function ysArr(arr){
                var $Dts = "";
                for(index in arr){
                    $Dts = $Dts + arr[index];
                }
                return $Dts
            }
            function shFade(show,hide,hide2,bool,index){
                var fadeSpeed = options.speed;
                hide.fadeOut(fadeSpeed);
                hide2.fadeOut(fadeSpeed);
                show.delay(fadeSpeed*2).fadeIn(fadeSpeed);
                if(bool){
                    $("#d_prev,#d_next").fadeOut(fadeSpeed);
                    $b.eq(index).hide();
                } else {
                    $("#d_prev,#d_next").fadeIn(fadeSpeed);
                    $b.show();
                    $year.show();
                    $month.show();
                }
            }
            function Traversal(Ty){
                $year.text(Ty);
                for(var m = 0; m < $dayFrame.length; m++){
                    var dayLi = "",
                        $fLi = "",
                        $lLi = "",
                        firstLi = "",
                        lastDay = 0,
                        yearWeek = new Date(Ty,m,1).getDay(),
                        fristDay,
                        fLiArr,
                        $addLi,
                        arr;
                    getDateCount(Ty,m-2) == undefined ? fristDay = 31 : fristDay = getDateCount(Ty,m-2);
                    for(var d = 1; d <= getDateCount(Ty,m-1); d++){
                        dayLi = dayLi + "<li class='jcDateColor'>"+ d +"</li>";
                    }
                    for(var f = 0 ; f < yearWeek; f++){
                        firstLi += "<li>"+ fristDay +"</li>,";
                        fristDay--;
                    }
                    for(var l = 0 ; l <= 42-(d+yearWeek); l++ ){
                        lastDay = l + 1;
                        $lLi += "<li>"+lastDay+"</li>";
                    }
                    fLiArr = firstLi.split(",").reverse();
                    for(arr in fLiArr){
                        $fLi += fLiArr[arr];
                    }
                    $addLi = $fLi + dayLi + $lLi;
                    $dayFrame.eq(m).html($addLi);

                }
            }
            function mAnimate(index){
                $dayFrame.eq(index).addClass("dateV").siblings().removeClass("dateV");
                $month.text(index+1);
                $jcDateMax.animate({ "left":-index*161 },options.Speed);
            }
            function today(y,m,d){
                $year.text(y);
                $month.text(m);
                Traversal(y);
                $.each($dayFrame.eq(m-1).find("li"),function(){
                    if($(this).hasClass("jcDateColor")){
                        $dayFrame.eq(m-1).find("li.jcDateColor").eq(d-1).addClass("visited");
                    }
                });
                $HiddenText.val(_date);
                $dayFrame.eq(m-1).find("li").text();
                mAnimate(m-1);
            }
            function clearVisited(){
                $.each($("li.jcDateColor",$dayFrame),function(){
                    if($(this).hasClass("visited")){
                        $(this).removeClass("visited");
                    }
                });
            }
            function formatDate(date) {
                var dateArr = date.split(options.Format);
                //判断日期month和day不足两位是否会自动补零
                if(options.DoubleNum) {
                    dateArr[1] = dateArr[1].length === 1? ('0' + dateArr[1]):dateArr[1];
                    dateArr[2] = dateArr[2].length === 1? ('0' + dateArr[2]):dateArr[2];
                }
                return dateArr.join(options.Format);
            }
            function submitDate(){
                var Sy = $year.text(),
                    Sm = $month.text(),
                    Sd = $HiddenText.val(),
                    dateInfo,
                    NowDateArr,
                    printDate,
                    format;
                NowDateArr = [Sy,Sm,Sd];
                dateInfo =NowDateArr.join(options.Format);
                if($hh.val() != "00" || $mm.val() != "00" ){
                    var Sh = $hh.val();
                    Sm = $mm.val();
                    NowDateArr.push(Sh+":"+Sm);
                    printDate = NowDateArr.join(options.Format).substring();
                    format = printDate.split("/");
                    dateInfo = format[0]+options.Format+format[1]+options.Format+format[2]+" "+format[3]
                }
                $("input.dateVisited").val(formatDate(dateInfo));
                closeDate();
                options.OnChange();
            }
            function closeDate(){
                $("input.dateVisited").removeClass("dateVisited");
                $jcDate.hide(options.Speed);
            }
            // 赋值数据
            $hh.val("00");
            $mm.val("00");
            if(options.Default === "today") {
                $dateInput.val(formatDate([_year, _month, _date].join(options.Format)));
            }else {
                $dateInput.val(formatDate(options.Default));
            }

            for(w in days) {
                weekDl = weekDl + "<dt>" + days[w] + "</dt>";
            }
            $weekFrame.html(weekDl);
            for(var lys = 0; lys < 9 ; lys++ ){
                lastYear = NowY - (lys+1);
                yArr.push("<dt>"+lastYear+"年"+"</dt>")
            }
            yArr.reverse();
            dtf = ysArr(yArr);
            yArr.length = 0;
            for(var fys = 0; fys < 8 ; fys++ ){
                firstYear = NowY + (fys+1);
                yArr.push("<dt>"+firstYear+"年"+"</dt>")
            }
            dtl = ysArr(yArr);
            $jcYeas.html(dtf+yearDl+dtl);
            for(var ms = 1; ms <= 12; ms++ ){
                if(ms == _month){
                    mArr.push("<dt class='visited'>" + ms + "月" +"</dt>");
                } else {
                    mArr.push("<dt>" + ms + "月" +"</dt>");
                }
            }
            for(mA in mArr){
                monthDl += mArr[mA];
            }
            $jcMonth.html(monthDl);
            $year.off().on("click",function(){
                $(this).addClass("visited").next("samp").removeClass("visited");
                shFade($jcYeas,$jcDayWrap,$jcMonth,true,1);
                $year.show();
                $month.hide();
            });
            $("#jcYeas dd,#jcYeas dt").off().on("click",function(){
                var y = parseInt($(this).text());
                Traversal(y);
                $year.text(y);
                shFade($jcDayWrap,$jcYeas,$jcMonth,false);
            });
            $month.off().on("click",function(){
                $(this).addClass("visited").prev().removeClass("visited");
                shFade($jcMonth,$jcDayWrap,$jcYeas,true,0);
                $month.show();
                $year.hide();
            });
            $jcMonth.find("dt").off().on("click",function(){
                var m = parseInt($(this).text());
                mAnimate(m-1);
                $month.text(m);
                shFade($jcDayWrap,$jcYeas,$jcMonth,false);
            });
            mAnimate(_month-1);
            //功能方法
            $d_prev.off().on("click",function(){
                _idx = $dayFrame.filter(".dateV").index();
                if( _idx > 0){
                    _idx --;
                } else {
                    var _Tyear = parseInt($year.text());
                    _Tyear--;
                    Traversal(_Tyear);
                    _idx = $dayFrame.length-1;
                }
                mAnimate(_idx);
            });
            $d_next.off().on("click",function(){
                _idx = $dayFrame.filter(".dateV").index();
                if( _idx < $dayFrame.length-1){
                    _idx ++;
                } else {
                    var _Tyear = parseInt($year.text());
                    _Tyear++;
                    Traversal(_Tyear);
                    _idx = 0;
                }
                mAnimate(_idx);
            });
            today(_year,_month,_date);
            $dayFrame.undelegate("li.jcDateColor","click").delegate("li.jcDateColor","click",function(){
                clearVisited();
                $(this).addClass("visited");
                $HiddenText.val(parseInt($(this).text()))
            });
            $dayFrame.undelegate("li.jcDateColor","dblclick").delegate("li.jcDateColor","click",function(){
                submitDate();
            });
            $Now.off().on("click",function(){
                today(_year,_month,_date);
            });
            $clear.off().on("click",function(){
                $("input.dateVisited").val("");
            });
            $submit.off().on("click",function(){
                submitDate();
            });
            $dateInput.addClass(options.Class).off().on(options.Event,function(e){
                    $(this).addClass("dateVisited");
                    var iof = $(this).offset();
                    $jcDate.css({ "left" : iof.left+options.Left,"top" : iof.top+options.Top });
                    $jcDate.show(options.Speed);
                    $jcDayWrap.show();
                    $jcYeas.hide();
                    $jcMonth.hide();
                    $("#d_prev,#d_next").show();
                    $year.show();
                    $month.show();
                    $b.show();
                });
            $jcDate.off().on("mouseleave",function(){
                setTimeout(closeDate,options.Timeout);
            });
        });
    };
}));