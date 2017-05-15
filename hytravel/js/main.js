/**
 * Created by surface on 2016/10/17.
 */
var hanyi = {};
hanyi.timeScroll = null;
hanyi.currentStep = "major1";
//初始化
hanyi.init = function () {
    hanyi.resize();
    hanyi.event();
    hanyi.majorAnimate();
    hanyi.firstAnitmate();
    hanyi.firstPic();
    $('body').height(8500);
    // hanyi.trans3D('.start', '.state1', '.state2', 0.4);

    menu.event();
    twoAnimate.init();
    threeAnimate.init();
    threeAnimate.event();
    ballmove.event(".screen3 .step3_1 .content_ball",
        "吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉吃肉");
    //fiveAnimate.event(".screen3 .step3_2 .content_ball","我动画好看滚动条在最上面的绑定一开始鼠标需要滑动滚动条时候，解除滚动条在最上面的绑定一开始鼠标需要滑动滚动条时候，解除滚动条在最上面的绑定一开始鼠标需要滑动滚动条时候，解除滚动条在最上面的绑定一开始鼠标需要滑动滚动条时候，解除滚动条在最上面的绑定一开始鼠标需要滑动滚动条时候，解除滚动条在最上面的绑定一开始鼠标需要滑动滚动条时候，解除滚动条在最上面的绑定");
    fourScreen.event();

}
$(document).ready(hanyi.init);


//绑定事件
hanyi.event = function () {
    // 刷新时候 设置滑动条在最前面
    $(window).bind("scroll", scrollFn);
    function scrollFn() {
        $(window).scrollTop(0);
    }

    //在一开始鼠标需要滑动滚动条时候，解除滚动条在最上面的绑定
    $(window).bind("mousedown", function () {
        $(window).unbind("scroll", scrollFn);
    })
    //鼠标滚动滚动条放下时候，运动到最近的屏幕上
    $(window).bind("mouseup", hanyi.mouseFn);
    //阻止默认事件
    $('.wrapper').bind('mousewheel', function (ev) {
        ev.preventDefault();
    })
    //移动滚动条时候控制屏幕转换
    $(window).bind("scroll", hanyi.scro);

    //滚动滑动控制动画
    $('.wrapper').one('mousewheel', mousewheelFn);
    var timer = null;

    function mousewheelFn(ev, direction) {
        $(window).unbind("scroll", scrollFn);
        if (direction < 1) {//滚轮向下
            hanyi.changeScreen("right");

        } else {//滚轮向上
            hanyi.changeScreen("left");
        }
//控制滚轮连续滚动触发的次数

        clearTimeout(timer)
        timer = setTimeout(function () {
            $('.wrapper').one('mousewheel', mousewheelFn);
        }, 1200)
    }

    $(window).resize(hanyi.resize);
}

//鼠标滚动滚动条放下时候，运动到最近的屏幕上
hanyi.mouseFn = function () {
    var currentT = hanyi.scale() * hanyi.timeScroll.totalDuration();
    var afterStep = hanyi.timeScroll.getLabelAfter(currentT);
    var beforeStep = hanyi.timeScroll.getLabelBefore(currentT);
    var afterTime = hanyi.timeScroll.getLabelTime(afterStep);
    var beforeTime = hanyi.timeScroll.getLabelTime(beforeStep);
    var afterMin = Math.abs(hanyi.timeScroll.time() - afterTime);
    var beforeMin = Math.abs(hanyi.timeScroll.time() - beforeTime);
    var step = "";
    //判断此时距离上一个屏幕还是下一个屏幕哪个近
    if (hanyi.scale() == 0) {
        step = "major1";
    } else if (hanyi.scale() == 1) {
        step = "major4";
    } else if (afterMin < beforeMin) {
        step = afterStep;

    } else if (afterMin > beforeMin) {
        step = beforeStep;
    }
    hanyi.timeScroll.tweenTo(step);
    hanyi.currentStep = step;
//计算此时滚动条应该滚动的距离
    var maxH = $('body').height() - $(window).height();
    var maxTime = hanyi.timeScroll.totalDuration();
    var afterTime = hanyi.timeScroll.getLabelTime(step);
    var dis = afterTime / maxTime * maxH;
    //滚动需要的时间
    var time = Math.abs(hanyi.timeScroll.time() - afterTime);

    var scollDis = new TimelineMax();
    scollDis.to("body,html", time, {"scrollTop": dis});


}
//移动滚动条时候控制屏幕转换
hanyi.scro = function () {
    var time = hanyi.scale() * hanyi.timeScroll.totalDuration();
    hanyi.timeScroll.seek(time, false);

}
//当前滚动条滚动的距离和可滚动距离的比值
hanyi.scale = function () {
    var maxH = $('body').height() - $(window).height();
    var h = $(window).scrollTop();
    return h / maxH;

}
//滚轮滑动控制每一屏的动画
hanyi.changeScreen = function (value) {
    if (value == "right") {
        //找到下一个屏幕
        var currentT = hanyi.timeScroll.getLabelTime(hanyi.currentStep);
        var afterStep = hanyi.timeScroll.getLabelAfter(currentT);
        if (!afterStep)return;
        //hanyi.timeScroll.tweenTo(afterStep);
        hanyi.currentStep = afterStep;

        //计算此时滚轮应该滑动的距离
        var maxH = $('body').height() - $(window).height();
        var maxTime = hanyi.timeScroll.totalDuration();
        var afterTime = hanyi.timeScroll.getLabelTime(afterStep);
        var dis = afterTime / maxTime * maxH;
        //滚动需要的时间
        var time = Math.abs(hanyi.timeScroll.time() - afterTime);
        var scrollDown = new TimelineMax();
        scrollDown.to('body,html', time, {"scrollTop": dis});
    }
    else if (value == "left") {

        //找到上一个屏幕
        var currentT = hanyi.timeScroll.getLabelTime(hanyi.currentStep);
        var beforeStep = hanyi.timeScroll.getLabelBefore(currentT);
        if (!beforeStep)return;
        //hanyi.timeScroll.tweenTo(beforeStep);
        hanyi.currentStep = beforeStep;

        //计算此时滚轮应该滑动的距离
        var maxH = $('body').height() - $(window).height();
        var maxTime = hanyi.timeScroll.totalDuration();
        var beforeTime = hanyi.timeScroll.getLabelTime(beforeStep);
        var dis = beforeTime / maxTime * maxH;
        //滚动需要的时间
        var time = Math.abs(hanyi.timeScroll.time() - beforeTime);
        var scrollUp = new TimelineMax();
        scrollUp.to('body,html', time, {"scrollTop": dis});

    }


}
//当屏幕改变大小时候设置
hanyi.resize = function () {

    $('.screen').width($(window).width());
    $('.screen:not(":first")').css("left", $(window).width());
    hanyi.majorAnimate();

}
//3D的翻转
hanyi.trans3D = function (obj, elem1, elem2, d) {
    var transBefore = new TimelineMax();
    transBefore.to($(obj).find(elem1), 0, {
        left: 0,
        rotationY: 0,
        transformPerspective: 800,
        transformOrigin: "center right"
    })
    transBefore.to($(obj).find(elem2), 0, {
        left: $(obj).width(),
        rotationY: 90,
        transformPerspective: 800,
        transformOrigin: "left center"
    })
//移入3D沿着Y轴翻转
    $(obj).bind("mouseenter", function () {
        var transTy1 = new TimelineMax();
        var e1 = $(this).find(elem1);
        var e2 = $(this).find(elem2);
        transTy1.to(e1, d, {rotationY: -90, left: -e1.width(), ease: Cubic.easeInOut}, 0);
        transTy1.to(e2, d, {rotationY: 0, left: 0, ease: Cubic.easeInOut}, 0);

    })

//移开3D图翻转回去
    $(obj).bind("mouseleave", function () {
        var transTy2 = new TimelineMax();
        var e1 = $(this).find(elem1);
        var e2 = $(this).find(elem2);
        transTy2.to(e1, d, {rotationY: 0, left: 0, ease: Cubic.easeInOut}, 0);
        transTy2.to(e2, d, {rotationY: 90, left: e2.width(), ease: Cubic.easeInOut}, 0);

    })
}
////在导航条上触发的事件
//hanyi.nav= function () {
//
//    //移动到nav 上面的时候控制下面白线的运动
//    $('.nav li').bind("mouseenter", function () {
//        var h=$(this).position().top + $(this).height()/2 + 10;
//
//        var lineMove=new TimelineMax();
//        lineMove.clear();
//        lineMove.to('.line',0.3,{top: h,opacity:1});
//        console.log(h);
//    })
//
//    $('.nav li').bind("mouseleave", function () {
//
//
//        var lineMoveOut=new TimelineMax();
//        lineMoveOut.to('.line',0.3,{opacity:0});
//    })
//
//}

//第一个屏幕的动画
hanyi.firstAnitmate = function () {
    var fir = new TimelineMax();
    fir.to('.menu', 0.6, {right: 60, opacity: 1, ease: Elastic.easeInOut});
    //fir.to('.nav', 0.5, {opacity: 1}, "-=0.4");
    //fir.to('.run',1.5,{left:$(window).width()*2/3,ease:Elastic.easeOut},"-=0.4");
    fir.to("body,html", 0, {"overflow-y": "scroll"});

}
//第一个屏展开动画的效果
hanyi.firstPic = function () {
    var open = true;
    $('.screen1 .openright').on('click', function () {
        if (timer) {
            true;
        }

        var timer = null;
        if (open) {

            var iNow = $('.screen1 .screen1_pic_mask div').length - 1;
            timer = setInterval(function () {

                $('.screen1 .screen1_pic_mask div').eq(iNow).attr('class', 'picmaskopen');
                iNow--;
                if (iNow == -1) {
                    clearInterval(timer);
                    timer = null;
                    open = false;
                }

            }, 100)


        } else {
            var iNow = 0;
            timer = setInterval(function () {


                $('.screen1 .screen1_pic_mask div').eq(iNow).attr('class', 'picmaskclose');
                iNow++;
                if (iNow == $('.screen1 .screen1_pic_mask div').length) {
                    clearInterval(timer);
                    timer = null;
                    open = true;
                }

            }, 100)


        }
    })
}
//配置主动画
hanyi.majorAnimate = function () {
    //当改变屏幕大小时候 记住时间点 固定在当前屏上
    var time = hanyi.timeScroll ? hanyi.timeScroll.time() : 0;
    if (hanyi.timeScroll) {
        hanyi.timeScroll.clear();
    }
    hanyi.timeScroll = new TimelineMax();
    //再次从第一屏到第二屏中 初始化
    hanyi.timeScroll.to(".scene1", 0, {
        onReverseComplete: function () {
            twoAnimate.timeline.seek(0, false);
        }
    }, 0);
    hanyi.timeScroll.add("major1");
    hanyi.timeScroll.to(".screen2", 0.8, {left: 0, ease: Cubic.easeInOut});

    //第二屏最开始的第一个小屏幕：
    hanyi.timeScroll.to({}, 0, {
        onComplete: function () {
            twoAnimate.timeline.tweenTo("state1");
        }
    }, "-=0.1");

    hanyi.timeScroll.add("major2");


    //把第二屏中的4个小屏配置到主屏中---------------------------------------------------
    //第二屏NO.1-NO2
    hanyi.timeScroll.to({}, 0, {
        onComplete: function () {
            twoAnimate.timeline.tweenTo("state2");
        }, onReverseComplete: function () {

            twoAnimate.timeline.tweenTo("state1");
        }
    })
    //增加动画时间，--多一个时间点
    hanyi.timeScroll.to({}, 0.4, {});
    hanyi.timeScroll.add("twoState1");
    //第二屏NO.1-NO2结束


    //第二屏NO.2-NO3
    hanyi.timeScroll.to({}, 0, {
        onComplete: function () {
            twoAnimate.timeline.tweenTo("state3");
        }, onReverseComplete: function () {

            twoAnimate.timeline.tweenTo("state2");
        }
    })
    //增加动画时间，--多一个时间点
    hanyi.timeScroll.to({}, 0.4, {});
    hanyi.timeScroll.add("twoState2");
    //第二屏NO.2-NO3结束


    //第二屏NO.3-NO4
    hanyi.timeScroll.to({}, 0, {
        onComplete: function () {
            twoAnimate.timeline.tweenTo("state4");
        }, onReverseComplete: function () {

            twoAnimate.timeline.tweenTo("state3");
        }
    })
    //增加动画时间，--多一个时间点
    hanyi.timeScroll.to({}, 0.4, {});
    hanyi.timeScroll.add("twoState3");
    //第二屏NO.3-NO4结束
//第二屏结束-----------------------------------------

    hanyi.timeScroll.to(".screen3", 0.8, {
        left: 0, ease: Cubic.easeInOut, onReverseComplete: function () {
            threeAnimate.timeline.seek(0, false);
        }
    });


    hanyi.timeScroll.to({}, 0, {
        onComplete: function () {
            threeAnimate.timeline.tweenTo("threestate2");
        }
    });
    hanyi.timeScroll.to({}, 0.8, {});

    hanyi.timeScroll.add("major3");

    ////第三屏开始No1-2
    //hanyi.timeScroll.to({}, 0, {
    //    onComplete: function () {
    //        threeAnimate.timeline.tweenTo("threestate2");
    //    }, onReverseComplete: function () {
    //        threeAnimate.timeline.tweenTo("threestate1");
    //    }
    //})
    //hanyi.timeScroll.to({}, 0.4, {});
    //hanyi.timeScroll.add("threePoint1");


    hanyi.timeScroll.to(".screen4", 0.8, {left: 0, ease: Cubic.easeInOut});


    hanyi.timeScroll.add("major4");

    hanyi.timeScroll.stop();
    hanyi.timeScroll.seek(time, false);


}

//左侧的menu运动
var menu = {};

//menu.init= function (state,direc) {
//    var oldMenu=$('.menu');
//    var newMenu=oldMenu.clone();
//    newMenu.removeClass("menu_state1").removeClass("menu_state2").removeClass("menu_state3").removeClass("menu_state4");
//    newMenu.addClass(state);
//    oldMenu.addClass("remove");
//
//    $('.menu_wrapper').append(newMenu);
//    hanyi.nav();//??????????????????????????????
//
//    hanyi.trans3D('.start','.po1','.po2',0.4);
//    if(direc=="right"){
//        var men=new TimelineMax();
//        men.to(oldMenu,0,{left:22,rotationY:0,transformPerspective:800,transformOrigin:"center left"});
//        men.to(newMenu,0,{left:-56,otationY:90,transformPerspective:800,transformOrigin:"right center"});
//        men.to(oldMenu,0.3,{left:100,rotationY:100,onComplete: function () {
//            $('.remove').remove();
//        }},0);
//        men.to(newMenu,0.3,{left:22,rotationY:0},0);
//
//    }else if(direc=="left"){
//
//        var men=new TimelineMax();
//        men.to(oldMenu,0,{left:22,rotationY:0,transformPerspective:800,transformOrigin:"right center"});
//        men.to(newMenu,0,{left:100,otationY:-90,transformPerspective:800,transformOrigin:"center left"});
//        men.to(oldMenu,0.3,{left:-56,rotationY:-100,onComplete: function () {
//            $('.remove').remove();
//        }},0);
//        men.to(newMenu,0.3,{left:22,rotationY:0},0);
//    }
//
//}

menu.event = function () {
    //$('.menu div').addClass('close');

    var timer = null;
    var open = true;
    $('.menu_head').on('click', function () {//展开的时候
        $('.menu span').addClass('openMenu').removeClass('closeMenu');
        if (timer) {
            return;
        }//如果存在定时器 则啥都不干；
        if (open) {

            var iNow = 0;
            timer = setInterval(function () {

                $('.menu div').eq(iNow).attr('class', 'show');
                $('.menu span').eq(iNow).css('color', 'rgba(255,255,255,1)');
                iNow++;

                if (iNow == $('.menu div').length) {

                    clearInterval(timer);
                    open = false;
                    timer = null;//定时器设置为NULL
                }
            }, 100)
        } else {

            var iNow = $('.menu div').length - 1;
            timer = setInterval(function () {//隐藏的时候

                $('.menu div').eq(iNow).attr('class', 'hide');
                $('.menu span').eq(iNow).css('color', 'rgba(0,0,0,0)');
                iNow--;

                if (iNow == -1) {

                    clearInterval(timer);
                    $('.menu span').removeClass('openMenu').addClass('closeMenu');
                    open = true;
                    timer = null;
                }
            }, 100)

        }

    })


//$('.menu span').on('mouseenter',spanMouseenterFn);

//当放到span上时候span 旋转
//function spanMouseenterFn(ev){
//
////.bug>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//var disX=ev.pageX-$(this).offset().left;
//    if(disX<$(this).width()/2){
//        $(this).css({
//            'WebkitTransform':'rotateY(-30deg)',
//            'MozTransform':'rotateY(-30deg)',
//                'MsTransform':'rotateY(-30deg)',
//            'OTransform':'rotateY(-30deg)',
//                'Transform':'rotateY(-30deg)',
//            //'transition':'0.5s',
//
//            //-webkit-transform-style: preserve-3d;
//            'WebkitTransformOrigin':'center center'
//        })
//    }else{
//        $(this).css({
//            'WebkitTransform':'rotateY(30deg)',
//            'MozTransform':'rotateY(30deg)',
//            'MsTransform':'rotateY(30deg)',
//            'OTransform':'rotateY(30deg)',
//            'Transform':'rotateY(30deg)',
//            //'transition':'0.5s',
//            'WebkitTransformOrigin':'center center'
//        })
//    }
//}//bug>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//    $('.menu span').on('mouseleave',spanMouseleaveFn);
//function spanMouseleaveFn(){
//
//    $(this).css({
//        'WebkitTransform':'rotateY(0deg)',
//        'MozTransform':'rotateY(0deg)',
//        'MsTransform':'rotateY(0deg)',
//        'OTransform':'rotateY(0deg)',
//        'Transform':'rotateY(0deg)',
//        'transition':'0.4s',
//        'WebkitTransformOrigin':'center'
//    })
//
//
//
//}
}


// 配置第二屏的动画
var twoAnimate = {};

twoAnimate.timeline = new TimelineMax();

//第二屏运动
twoAnimate.init = function () {
    twoAnimate.timeline.to(".screen2_1 .screen2_an_right", 0.4, {
        left: $(window).width() - 300,
        ease: Elastic.easeInOut
    });
    twoAnimate.timeline.staggerTo(".screen2_1 .main img", 1.5, {opacity: 1, rotationX: 0, ease: Elastic.easeOut}, 0.1);
    twoAnimate.timeline.to(".screen2_1 .xie", 0.4, {opacity: 1, top: 180, ease: Elastic.easeOut}, "-0.2");

    //twoAnimate.timeline.to('.screen2  .step .screen2_1 .eat',0.5,{opacity:1,onComplete: function () {
    //    $('.screen2  .step .screen2_1 .eat').addClass('eatMove');
    //}},"+=0.2");

    twoAnimate.timeline.to(".points", 0.2, {bottom: 20}, "-=1");

    //第一个按钮
    twoAnimate.timeline.to(".screen2 .point0 .text", 0.1, {opacity: 1});
    twoAnimate.timeline.to(".screen2 .point0 .point_icon", 0, {"background-position": "right top"});


    twoAnimate.timeline.add("state1");

    twoAnimate.timeline.staggerTo(".screen2_1 img", 0.2, {opacity: 0, rotationX: 90}, 0);
    twoAnimate.timeline.to('.screen2  .step .screen2_1 .eat', 0.5, {opacity: 0});

    twoAnimate.timeline.to(".screen2_2 .left", 0.4, {opacity: 1});
    twoAnimate.timeline.staggerTo(".screen2_2 .right img", 0.3, {
        opacity: 1,
        rotationX: 0,
        ease: Cubic.easeInOut
    }, 0, "-=0.4");

    //第二个按钮

    twoAnimate.timeline.to(".screen2 .point .text", 0, {opacity: 0}, "-=0.4");
    twoAnimate.timeline.to(".screen2 .point1 .text", 0.1, {opacity: 1});
    twoAnimate.timeline.to(".screen2 .point .point_icon", 0, {"background-position": "left top"}, "-=0.4");
    twoAnimate.timeline.to(".screen2 .point1 .point_icon", 0, {"background-position": "right top"}, "-=0.4");

    twoAnimate.timeline.add("state2");

    twoAnimate.timeline.to(".screen2_2 .left", 0.4, {opacity: 0});
    twoAnimate.timeline.staggerTo(".screen2_2 .right img", 0.3, {
        opacity: 0,
        rotationX: 90,
        ease: Cubic.easeInOut
    }, 0, "-=0.4");
    twoAnimate.timeline.to(".screen2_3 .left", 0.4, {opacity: 1});
    twoAnimate.timeline.staggerTo(".screen2_3 .right img", 0.3, {
        opacity: 1,
        rotationX: 0,
        ease: Cubic.easeInOut
    }, 0, "-=0.4");

    //第三个按钮

    twoAnimate.timeline.to(".screen2 .point .text", 0, {opacity: 0}, "-=0.4");
    twoAnimate.timeline.to(".screen2 .point2 .text", 0.1, {opacity: 1});
    twoAnimate.timeline.to(".screen2 .point .point_icon", 0, {"background-position": "left top"}, "-=0.4");
    twoAnimate.timeline.to(".screen2 .point2 .point_icon", 0, {"background-position": "right top"}, "-=0.4");

    twoAnimate.timeline.add("state3");

    twoAnimate.timeline.to(".screen2_3 .left", 0.4, {opacity: 0});
    twoAnimate.timeline.staggerTo(".screen2_3 .right img", 0.3, {
        opacity: 0,
        rotationX: 90,
        ease: Cubic.easeInOut
    }, 0, "-=0.4");
    twoAnimate.timeline.to(".screen2_4 .left", 0.4, {opacity: 1});
    twoAnimate.timeline.staggerTo(".screen2_4 .right img", 0.3, {
        opacity: 1,
        rotationX: 0,
        ease: Cubic.easeInOut
    }, 0, "-=0.4");

    //第三个按钮

    twoAnimate.timeline.to(".screen2 .point .text", 0, {opacity: 0}, "-=0.4");
    twoAnimate.timeline.to(".screen2 .point3 .text", 0.1, {opacity: 1});
    twoAnimate.timeline.to(".screen2 .point .point_icon", 0, {"background-position": "left top"}, "-=0.4");
    twoAnimate.timeline.to(".screen2 .point3 .point_icon", 0, {"background-position": "right top"}, "-=0.4");

    twoAnimate.timeline.add("state4");

    twoAnimate.timeline.stop();
};


// 配置第三屏的动画
var threeAnimate = {};

threeAnimate.timeline = new TimelineMax();
threeAnimate.init = function () {
    threeAnimate.timeline.add('threestate1');
    threeAnimate.timeline.to('.ball_run', 0.8, {left: -40, top: 80, opacity: 1, ease: Elastic.easeInOut});
    threeAnimate.timeline.staggerTo('.screen3 .content_showList img', 0.8, {opacity: 1, rotationX: 0}, 0.1, "-=0.8");
    threeAnimate.timeline.add('threestate2');
    threeAnimate.timeline.stop();

}
//第三屏的图片效果
threeAnimate.event = function () {


    $('.screen3 .content_showList  img').bind('mouseenter', function () {


        var change1 = new TimelineMax();
        change1.to($(this), 0.2, {opacity: 0.5})
    })

    $('.screen3 .content_showList  img').bind('mouseleave', function () {


        var change2 = new TimelineMax();
        change2.to($(this), 0.2, {opacity: 1})
    })

    $('.screen3 .content_showList  img').bind('click', function () {

        var newImage = $(this).clone();
        newImage.css({position: "absolute", left: $(this).position().left, top: $(this).position().top, opacity: 1})
        $('.screen3 .content_showList').append(newImage);


        var changebig = new TimelineMax();
        var $closeBtn = $(' <img class="closepic" src="image/scene3/close.png" alt=""/>');
        //克隆的图片放大
        changebig.to(newImage, 1, {
            rotationZ: 720,
            width: $(window).width(),
            height: $(window).height(),
            left: -20,
            top: -20,
            onComplete: function () {
                newImage.attr('class', 'bo');


                $(document).bind('mousemove', mouseMFn);

                function mouseMFn(ev){



                        //绑定删除按钮
                        $('.screen3').append($closeBtn);
                        var oClose = new TimelineMax();
                        oClose.to('.screen3 .closepic', 0.6, {
                            scale: 6, rotationZ: 360, opacity: 1, left: ev.pageX, top: ev.clientY, onComplete: function () {
                                //$(this).css('cursor','pointer');
                                $(document).bind('click', function () {
                                    $(document).unbind('mousemove', mouseMFn);
                                    $closeBtn.remove();
                                    newImage.remove();
                                })
                            }
                        })

                }
                newImage.bind('click', function () {

                })

            }
        });


    })
}
//配置第四屏的事件
var fourScreen = {};
fourScreen.event = function () {
    $(document).on('mousemove', function (ev) {
        $.each($('.showSamll img'), function () {
            var a = $(this).offset().left + $(this).width() / 2 - ev.pageX;
            var b = $(this).offset().top + $(this).height() / 2 - ev.pageY;
            var c = Math.sqrt(a * a + b * b);
            var dis = 1 - c / 300;
            if (dis < 0.5) {
                dis = 0.5
            }
//计算鼠标和图片的距离 距离越小 图片越大
            $(this).css('width', dis * 150);

        })

    })

    $('.showSamll img').on('click', function () {
        //触发上面的事件
        $('.showText div').css('display', 'none');
        $('.showText div').eq($(this).index()).css('display', 'block');


    })
}


var ballmove = {};

ballmove.event = function (ball, str) {

    // var str="每天都没好吃的过的苦逼日了够不开心请和我客每天都没好吃的过的苦逼日了够不开心请和我客每天都没好吃的过的苦逼日了够不开心请和我客每天都没好吃的过的苦逼日了够不开心请和我客每天都没好吃的过的苦逼日了够不开心请和我客每天都没好吃的过的苦逼日了够不开心请和我客气好我去问和我客气好我去问驱蚊和我客气好我去问驱蚊和我客气好我去问驱蚊和我客气好我去问驱蚊和我客气好我去问驱蚊驱蚊器好胃口很齐全和我客气我还客气2额客户尾款";
    var layer;
    //计算一共多少层  每层有几个字
    for (var i = 3; i < 13; i++) {
        var num = i * i + (i + 1) * (i + 1);
        if (num >= str.length) {
            layer = (i - 1) * 2 - 1;
            break;
        }
        layer = (i - 1) * 2 - 1;
    }
    var num = -1;
    var arr = [];
    for (var i = 0; i < layer; i++) {
        if (i < (layer + 1) / 2) {
            num += 2;
        } else {
            num -= 2;
        }

        arr.push(num);
    }


    var phi;
    var r = 100;
    var m = 0;
    var theta = Math.PI / (arr.length - 1);
    for (var i = 0; i < arr.length; i++) {
        phi = Math.PI * 2 / arr[i];
        for (var j = 0; j < arr[i]; j++) {

            var $li = $('<li>' + str[m] + '</li>');
            m++;
            drawCircle($li, theta, phi, i, j);
            $li.css({
                "WebkitTransform": "translate3D(" + $li.circleX + "px, " + $li.circleY + "px," + $li.circleZ + "px ) rotateY(" + $li.circlePhi + "rad) rotateX(" + $li.circleTheta + "rad)",


            });
            $(ball).find('ul').append($li);
        }
    }

    var ideg = 0;

    var timer = setInterval(function () {
        ideg++;

        $(ball).css({
            'WebkitTransform': 'rotateX(' + ideg + 'deg) rotateY(' + ideg + 'deg)',
            'MozTransform': 'rotateX(' + ideg + 'deg) rotateY(' + ideg + 'deg)',
            'MsTransform': 'rotateX(' + ideg + 'deg) rotateY(' + ideg + 'deg)',
            'OTransform': 'rotateX(' + ideg + 'deg) rotateY(' + ideg + 'deg)',
            'Transform': 'rotateX(' + ideg + 'deg) rotateY(' + ideg + 'deg)',
        })
    }, 30)
//画圆
    function drawCircle(obj, theta, phi, i, j) {
        obj.circleX = r * Math.sin(theta * i) * Math.sin(phi * j) + 150;
        obj.circleY = -r * Math.cos(theta * i) + 250;
        obj.circleZ = r * Math.sin(theta * i) * Math.cos(phi * j);
        obj.circleTheta = -Math.PI / 2 + theta * (arr.length - i);
        obj.circlePhi = phi * j;
    }


}
//fiveAnimate.timeline = new TimelineMax();
//fiveAnimate.init= function () {
//fiveAnimate.timeline.to('.screen5 .ball_run',0.5,{opacity:1,left:20,top:200,ease:Bounce.easeInOut});
//    fiveAnimate.timeline.add("fivestate1");
//fiveAnimate.timeline.stop();
//
//}
