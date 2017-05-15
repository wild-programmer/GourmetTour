/**
 * Created by Administrator on 2016/9/2.
 */


$(document).ready(function () {
    $(".zImgBtn").click(function () {
            $(".zNavi").slideToggle(500);
        }
    );
    $('#test1,#test8').boxSlider({
        timeout: 1000,
        speed: 500
        , autoScroll: true
        , effect: 'scrollVert3d'
    });

    $('#test2,#test10,#test6').boxSlider({
        timeout: 3000,
        speed: 1000
        , autoScroll: true
        , effect: 'scrollHorz3d'
    });

    $('#test3,#test5,#test9').boxSlider({
        timeout: 3000,
        speed: 1000
        , autoScroll: true
        , effect: 'scrollVert3d'
    });

    $('#test4,#test7').boxSlider({
        timeout: 3000,
        speed: 1000
        , autoScroll: true
        , effect: 'scrollVert3d'
    });





    var content = $(".beforSay .content")[0];
    $("#prev").click(function () {
        if(content.scrollTop >= (content.scrollHeight - content.offsetHeight)) return;
        content.scrollTop += 10;
    });

    $("#next").click(function () {
        if(content.scrollTop <= 0) return;
        content.scrollTop -= 10;
    });


    setTimeout(function () {
        $("#flyB").animate({left:-480},1000);
    },3000);
   ;
});