/**
 * Created by jake on 2016/10/20.
 */
$(function () {
    $(".nav_list li").append("<ins></ins>");
    $(".nav_list li").mouseenter(function () {
        $(this).children("ins").stop().animate({"top": 0}, 200);
        $("audio").get($(this).index()).load();
        $("audio").get($(this).index()).play();
    }).mouseleave(function () {
        $(this).children("ins").stop().animate({"top": "110px"}, 200);
    })
    $(".bannerList li").each(function (index, ele) {
        $(ele).css({"backgroundImage": "url('images/b" + (index + 1) + ".jpg')"});
        $(".scroll").append("<li></li>");
    })
    var cloneImg = $(".bannerList").children().eq(0).clone(true);
    $(".bannerList").append(cloneImg);
    $(".scroll li:first").addClass("current");

    //轮播图样式开始
    var dKey = imgKey = 0;
    var timer = null;
    timer = setInterval(rightScroll, 2000);
    $(".box").hover(function () {
        clearInterval(timer);
        $(".leftBtn,.rightBtn").show();
    }, function () {
        clearInterval(timer);
        timer = setInterval(rightScroll, 2000);
        $(".leftBtn,.rightBtn").hide();
    })
    $(".rightBtn").click(rightScroll);

    $(".leftBtn").click(function () {
        dKey--;
        if (dKey < 0) {
            dKey = 4;
        }
        $(".scroll li").eq(dKey).addClass("current").siblings().removeClass("current");
        imgKey--;
        if (imgKey < 0) {
            $(".bannerList").css({"left": "-500%"});
            imgKey = 4;
        }
        var move = -imgKey * 100;
        move = move + "%";
        $(".bannerList").stop().animate({"left": move}, 200);
    })
    $(".scroll li").click(function () {
        var thisIndex = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        var move = -thisIndex * 100;
        move = move + "%";
        $(".bannerList").stop().animate({"left": move}, 200);
        imgKey = thisIndex;
        dKey = thisIndex;
    })
    function rightScroll() {
        dKey++;
        if (dKey > 4) {
            dKey = 0;
        }
        $(".scroll li").eq(dKey).addClass("current").siblings().removeClass("current");
        imgKey++;
        if (imgKey > 5) {
            $(".bannerList").css({"left": 0});
            imgKey = 1;
        }
        var move = -imgKey * 100;
        move = move + "%";
        $(".bannerList").stop().animate({"left": move}, 200);
    }

    //轮播图样式结束

    //手风琴开始
    var lis = $(".pianoList li");
    for (var i = 0; i < lis.length; i++) {
        $(lis).eq(i).css({
            "backgroundImage": "url('images/pic0" + (i + 1) + ".jpg')",
            "left": i * 156 + "px"
        });
        $(lis).hover(function () {
            for (var i = 0; i < lis.length; i++) {
                if (i <= $(this).index()) {
                    $(lis).eq(i).stop().animate({"left": i * 50 + "px"}, 250);
                } else {
                    $(lis).eq(i).stop().animate({"left": i * 50 + 530 + "px"}, 250);
                }
            }
        }, function () {
            for (var i = 0; i < lis.length; i++) {
                $(lis).eq(i).stop().animate({"left": i * 156 + "px"}, 250);
            }
        })
    }
    //手风琴结束


    //感知滑块
    $('.cityList li').hover(function (event) {
        var eventType = event.type;
        //alert($(this).width());
        //检测方向代码块
        //最终返回direction：
        //0：上方
        //1：右侧
        //2：下方
        //3：左侧
        var w = $(this).width();
        var h = $(this).height();
        var x = (event.pageX - $(this).offset().left - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (event.pageY - $(this).offset().top - (h / 2)) * (h > w ? (w / h) : 1);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;


        if (eventType == 'mouseenter') {

            //进入状态
            // alert('进入');
            //alert(direction);
            if (direction == 0) {
                //console.log('从上方进入');

                //一瞬间要让boxIn的top到达-550px，同时还得显示
                //因为等会要书写左右两侧的动画，会改变left；
                //为了不受后面的效果影响，预先把left做一次归零
                $(this).find(".hideBox").css({
                    'top': -376,
                    'left': 0,
                    'display': 'block'
                });
                $(this).find(".hideBox").stop().animate({
                    'top': 0
                }, 200);
            } else if (direction == 1) {
                // console.log('从右侧进入');
                $(this).find(".hideBox").css({
                    'top': 0,
                    'left': 251,
                    'display': 'block'
                });
                $(this).find(".hideBox").stop().animate({
                    'left': 0
                }, 200);
            } else if (direction == 2) {
                // console.log('从下方进入');
                $(this).find(".hideBox").css({
                    'top': 376,
                    'left': 0,
                    'display': 'block'
                });
                $(this).find(".hideBox").stop().animate({
                    'top': 0
                }, 200);

            } else {
                //console.log('从左侧进入');
                //因为等会要书写左右两侧的动画，会改变top；
                //为了不受后面的效果影响，预先把top做一次归零
                $(this).find(".hideBox").css({
                    'top': 0,
                    'left': -376,
                    'display': 'block'
                });
                $(this).find(".hideBox").stop().animate({
                    'left': 0
                }, 200);
            }
        } else {
            //离开状态
            // alert('离开');
            // alert(direction);
            if (direction == 0) {
                console.log('从上方离开');
                //让top还原到-550px
                $(this).find(".hideBox").stop().animate({
                    'top': -376
                }, 200);

            } else if (direction == 1) {
                $(this).find(".hideBox").stop().animate({
                    'left': 251
                }, 200);

            } else if (direction == 2) {
                $(this).find(".hideBox").stop().animate({
                    'top': 376
                }, 200);
            } else {
                $(this).find(".hideBox").stop().animate({
                    'left': -251
                }, 200);
            }

        }
    })
    //

    //盒子显示
    $('.goodFood li').hover(function () {
        $(this).find(".hideTitle").stop().animate({"bottom": 0}, 200);
    }, function () {
        $(this).find(".hideTitle").stop().animate({"bottom": -100}, 200);
    })

    //tab栏切换
    $(".nl li").hover(function () {
        var thisIndex = $(this).index();
        $(this).addClass("nCurrent").siblings().removeClass("nCurrent");
        var move = thisIndex * 100;
        move = -move + "%";
        $(".n2").stop().animate({"left": move}, 300);
    })


    //底部特效
    $(".closeBtn").click(function () {
        $(".downLoad").stop().animate({"left": "-100%"}, 200, function () {
            $(".fiveBtn").css({"left": "-60px"});
        });
    })
    $(".fiveBtn").click(function () {
        $(".downLoad").stop().animate({"left": 0}, 200);
        $(this).css({"left": "-129px"});
    })

    //返回顶部
    var windowHeight = $(window).height();
    //console.log($(window).height());
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(".top").height()) {
            $(".top").css({
                "position": "fixed",
                "left": 0,
                "top": 0,
                "z-index": 999,
            });
        } else {
            $(".top").css({
                "position": "static"
            });
        }
        if ($(window).scrollTop() >= windowHeight) {
            $(".short").show();
        } else {
            $(".short").hide();
        }
    })
    $(".short").click(function () {
        $("body,html").stop().animate({"scrollTop": 0}, 200);
    })
})
//function direction(obj,event){
//    event=event||window.event;
//    var eventType=event.type;
//    var w=$(this).width();
//    var h=$(this).height();
//    var x=(event.pageX-$(this).offset().left-(w/2))*(w>h?(h/w):1);
//    var y=(event.pageY-$(this).offset().top-(h/2))*(h>w?(w/h):1);
//    var direction=Math.round((((Math.atan2(y, x)*(180/Math.PI))+180)/90)+3)%4;
//    if(eventType=='mouseenter'){
//
//        //进入状态
//        // alert('进入');
//        //alert(direction);
//        if(direction==0){
//            //console.log('从上方进入');
//
//            //一瞬间要让boxIn的top到达-550px，同时还得显示
//            //因为等会要书写左右两侧的动画，会改变left；
//            //为了不受后面的效果影响，预先把left做一次归零
//            $(this).find(obj).css({
//                'top': -$(this).height(),
//                'left': 0,
//                'display': 'block'
//            });
//            $(this).find(obj).stop().animate({
//                'top':0
//            }, 200);
//        }else if(direction==1){
//            // console.log('从右侧进入');
//            $(this).find(obj).css({
//                'top': 0,
//                'left': $(this).width(),
//                'display':'block'
//            });
//            $(this).find(obj).stop().animate({
//                'left':0
//            }, 200);
//        }else if(direction==2){
//            // console.log('从下方进入');
//            $(this).find(obj).css({
//                'top': $(this).height(),
//                'left': 0,
//                'display':'block'
//            });
//            $(this).find(obj).stop().animate({
//                'top':0
//            }, 200);
//
//        }else{
//            //console.log('从左侧进入');
//            //因为等会要书写左右两侧的动画，会改变top；
//            //为了不受后面的效果影响，预先把top做一次归零
//            $(this).find(obj).css({
//                'top': 0,
//                'left': -$(this).height(),
//                'display':'block'
//            });
//            $(this).find(obj).stop().animate({
//                'left':0
//            }, 200);
//        }
//    }else{
//        //离开状态
//        // alert('离开');
//        // alert(direction);
//        if(direction==0){
//            console.log('从上方离开');
//            //让top还原到-550px
//            $(this).find(obj).stop().animate({
//                'top':-$(this).height()
//            }, 200);
//
//        }else if(direction==1){
//            console.log('从右侧离开');
//            $(this).find(obj).stop().animate({
//                'left':$(this).width()
//            }, 200);
//
//        }else if(direction==2){
//            console.log('从下方离开');
//            $(this).find(obj).stop().animate({
//                'top':$(this).height()
//            }, 200);
//        }else{
//            console.log('从左侧离开');
//            $(this).find(obj).stop().animate({
//                'left':-$(this).width()
//            }, 200);
//        }
//
//
//    }
//}
