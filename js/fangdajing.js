window.onload = function () {
    var oPic = document.getElementById('picList');
    var aPics = oPic.children;
    var oTest = document.getElementById('textList');
    var aTest = oTest.children;
    var oBtns = document.getElementById('btns');
    var aBtns = oBtns.children;
    var oZoom = document.getElementById('zoom');
    var oZoomPic = document.getElementById('zoomPic')
    var oMove = document.getElementById('move');
    var aPicSrc = ["imgs/110/1.png", "imgs/110/2.png", "imgs/110/3.png"];
    var iScale = 650 / 550;//放大图片和小图片的比例
    var oTimer = null;
    iScale = iScale.toFixed(2);
    oMove.onmousemove = function (ev) {
        var ix = ev.clientX;

//        console.log(ev.clientX);
        //鼠标相对于图片的位置
        if (ev.clientX > getLeft(this) && ev.clientX < getLeft(this) + this.offsetWidth) {
            clearTimeout(oTimer);
            oTimer = null;
            toZoom(ix);

        } else {


            oTimer = setTimeout(function () {
                toZoom(getLeft(oPic));
                oTimer = null;
            }, 200)
        }


    }
    var iNow = 0;
    for (var i = 0; i < aBtns.length; i++) {
        aBtns[i].index = i;
        aBtns[i].onclick = function () {

            aBtns[iNow].className = '';
//         toHide(iNow);
            zoomHide(iNow);
            iNow = this.index;
            aBtns[iNow].className = 'active';

        }
    }
    function zoomHide(nub) {
        oZoomPic.style.backgroundImage = "url('')";
        oZoomPic.style.transition = 500 + 'ms';
        oZoom.style.transition = 500 + 'ms';
        oZoom.style.WebkitTransform = 'rotate(-34deg)';//
        oZoomPic.style.WebkitTransform = 'rotate(30deg)';
        oZoom.addEventListener('webkitTransitionEnd', end, false);
        function end() {

            oZoomPic.style.backgroundImage = "url('')";
            setTimeout(function () {
                oZoomPic.style.backgroundImage = "url(" + aPicSrc[iNow] + ")";
            },100);
            this.removeEventListener('webkitTransitionEnd', end, false);

            toHide(nub);

        }
    }

    function toHide(nub) {
        aPics[nub].style.transition = '0.3s';
        aTest[nub].style.transition = '0.3s';
        console.log(aPics[nub]);



        //aPics[nub].addEventListener('webkitTransitionEnd', picshow, false);
        //aTest[nub].addEventListener('webkitTransitionEnd', textshow, false);
        picshow.call(aPics[nub]);
        textshow.call(aPics[nub]);

        aPics[nub].className = 'hide';
        aTest[nub].className = 'hide';

    }

    function picshow() {
        console.log('picshow ex');
        //this.removeEventListener('webkitTransitionEnd', picshow, false);
        this.style.transition = '0';
        this.className = '';
        aPics[iNow].style.transition = '.5s';

        aPics[iNow].className = 'active';

        //aPics[iNow].addEventListener('webkitTransitionEnd', end, false);
        //function end() {
            oZoomPic.style.transition = 500 + 'ms';
            oZoom.style.transition = 500 + 'ms';
            //this.removeEventListener('webkitTransitionEnd', end, false);

            oZoom.style.WebkitTransform = 'rotate(0deg)';
            oZoomPic.style.WebkitTransform = 'rotate(0deg)';
        //}
    }

    function textshow() {
        //this.removeEventListener('webkitTransitionEnd', textshow, false);
        this.style.transition = '0';

        this.className = '';
        aTest[iNow].style.transition = '.6s';
        aTest[iNow].className = 'active';

    }

//    toZoom(oPic.offsetLeft);
    function toZoom(iX) {
       /* console.log(oPic.offsetLeft);*/
        //>>>>>>>>>>>>>>>???
        var iLeft = (iX - 420) * iScale;
//        var iTime=Math.abs(oZoom.offsetLeft-(iX-200));
//        iTime=iTime<30?0:iTime;
       /* console.log(iX);*/
        oZoomPic.style.transition = '0ms';
        oZoom.style.transition = '0ms';
        oZoomPic.style.backgroundPosition = -iLeft + '64px 0px';
        //跟随鼠标移动
        oZoom.style.left = iX - 126 + 'px';

    }

    function getLeft(obj) {

        var iLeft = 0;
        while (obj) {
            iLeft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
        return iLeft;
    }

}