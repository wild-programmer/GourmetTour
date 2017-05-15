/**
 * Created by Administrator on 2016/10/26.
 */
var minSize = 5;
var maxSize = 50;
var newOn = 80;
var flake = $("<div></div>").css({ "position": "absolute", "top": "-50px" }).html("吃");
$(document).ready(function () {
    //雪花部分开始
    var documentHeight = $(document).height();
    var documentWidth = $(document).width();
    setInterval(function () {
        var startPositionLeft = Math.random() * documentWidth;
        var sizeFlake = minSize + Math.random() * maxSize;
        var endPositionLeft = Math.random() * documentWidth;
        var durationFall = documentHeight * 10 + Math.random() *
            3000;
        var startOpacity = 0.7 + 0.3 * Math.random();
        var endOpacity = 0.5 * Math.random();
        flake.clone().appendTo($("body")).css({
            "left": startPositionLeft,
            "opacity": startOpacity,
            "font-size": sizeFlake,
            "color": "#fff"
        }).animate({
            "top": documentHeight - 40,
            "left": endPositionLeft,
            "opacity": endOpacity
        }, durationFall, function () {
            $(this).remove();
        });
    }, newOn);
    //雪花部分结束
    //导航部分效果显示开始
    $("#logo").mouseenter(function () {
        $("#nav").stop().animate({width:900},1000);
    })
    $("#nav").mouseenter(function () {
        $("#nav").stop().animate({width:900},1000);
    })
    $("#nav").mouseleave(function () {
        $("#nav").stop().animate({width:0},1000);
    })
    $("#navbar>ul>li").mouseenter(function () {
        $(this).children().stop().slideDown(300);
    })
    $("#navbar>ul>li").mouseleave(function () {
        $(this).children().stop().slideUp(300);
    })
    //导航部分结束
    //背景图片轮播显示开始
    $(".tab>ul>li").mouseenter(function () {
        var index = $(this).index();//获取当前索引值
        //让当前所引指的子元素透明度及border-radius值改变
        $(this).children().stop().animate({"opacity": 1, "border-radius": 50})
        //让当前所引指的兄弟元素透明度及border-radius值改变
        $(this).siblings().find("img").stop().animate({"opacity": 0.4, "border-radius": 20});
        //让相应索引的大图片的透明度改变
        $("#box >.uImg> li").eq(index).children().stop().animate({"opacity": 1}, 1000)
        $("#box >.uImg> li").eq(index).siblings().children().stop().animate({"opacity": 0}, 1000);
// $(".bg .bgimg li").eq(index).children().fadeIn();
    })
    //背景图片轮播显示结束
})
