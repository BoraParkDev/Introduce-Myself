//index.js

function loadImg() {
    $('.loading').append().show();
    $('.loading>img').append().show();
}

function closeImg() {
    $('.loading, .loading>img').hide();
    $('.loading, .loading>img').remove();
}


/*////////////////////////////////////////////*/ ///
//1.scroll
var pno = 0; //page number
const totcnt = 7; //total page number
var prot = 0; //scroll 방지 변수(0 - 허용, 1-금지)


$(function () {
    //로딩페이지
       loadImg();
       
       setTimeout(function(){
           closeImg()
       },2000);

    //새로고침
    $('html, body').animate({
        scrollTop: 0
    }, 100);
   
    //로고클릭
    $('.logo').click(function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        },100);
        pno=0;
    });
    
    //#page1 초기설정
    $('#page1>.chrM').stop().delay(1100).animate({
        left: '40%'
    }, 3000, function () {
        $(this).stop().animate({
            bottom: '20%'
        }, 1000);
        $('#page1 p').delay(600).fadeIn(600);
    });

    //마우스휠이벤트
    $(document).on('mousewheel DOMMouseScroll', function (e) {

        e.preventDefault();

        if (prot === 1) return false;
        prot = 1;

        var evt = window.event || e;

        var delta = evt.wheelDelta;
        console.log('마우스휠 델타값: ', delta);

        if (delta > 0) {
            pno--;
            if (pno === -1) pno = 0;
        } else {
            pno++;
            if (pno === totcnt) pno = totcnt - 1;
        }
        console.log('페이지 번호: ', pno);

        var pagepos = $('.page').eq(pno).offset().top;


        $('html, body').stop().animate({
            scrollTop: pagepos + 'px'
        }, 600, 'easeInOutQuad', function () {
            prot = 0;

            pageAction();
        });

        chgMenu();


    }) //Mousewheel

 
    /*menu 클릭시 해당 페이지로 이동*/
    $('nav a').click(function(e){

        e.preventDefault();

        var pid = $(this).attr('href');
        console.log(pid);

        var pi = Number(pid.slice(pid.length-1,pid.length)) - 1;
        console.log(pi)

        pno = pi;

        var mpos = $('.page').eq(pi).offset().top;
        
        $('html, body').stop().animate({
            scrollTop: mpos + 'px'
        },600, 'easeInOutQuad', function () {

            pageAction();
        });

        chgMenu();
    });

}); //jQuery

/* chgMenu함수 */
function chgMenu() {
    if (pno === 0) {
        $('nav li').eq(0).addClass('selM').siblings().removeClass('selM');
    } else if (pno >= 1 && pno <= 3) {
        $('nav li').eq(1).addClass('selM').siblings().removeClass('selM');
    } else if (pno === 4) {
        $('nav li').eq(2).addClass('selM').siblings().removeClass('selM');
    } else if (pno >= 5 && pno <= totcnt) {
        $('nav li').eq(3).addClass('selM').siblings().removeClass('selM');
    }
}

/*pageAction 함수*/
function pageAction() {
    if (pno === 0) {
        $('#page1>.chrM').animate({
            left: '40%'
        }, 3000, function () {
            $(this).stop().animate({
                bottom: '20%'
            }, 1000);
            $('#page1 p').delay(600).fadeIn(600);
        });
    } else if (pno === 1) {

        $('.item').click(function (e) {
            e.preventDefault();

            $(this).stop().fadeOut();
            $(this).next().fadeIn(300);
        });

    } else if (pno === 2) {
        $('#page3>.chrM').stop().animate({
            top: '100%'
        }, 1000);
    } else if (pno === 3) {
        $('#page4>.chrM').stop().animate({
            left: '41%'
        }, 1000, function () {
            $(this).animate({
                bottom: '30%'
            }, 500, function () {
                $('.question').stop().hide();
            }).animate({
                bottom: '-50%'
            }, 450, function () {
                $('.popup').show(10);
                $('.closeBtn').click(function (e) {
                    $('.popup').hide();
                }); //click
            });
        }); //animate

    } else if(pno ===4){       
        $('.card-box').hover(function(){
            $(this).find('a:last').show();
        },function(){
            $(this).find('a:last').hide();
        });

    } else if(pno ===5){
        showBar(0,640);
        showBar(1,560);
        showBar(2,240);
        showBar(3,320);
        showBar(4,160);
        showBar(5,120);
    }

} //pageAction 함수

/* showBar 함수 */
function showBar (n, wd) {
    $('.bar-box').eq(n).find('span:last').stop().delay(300).animate({
        width: wd + 'px'
    },1000,'easeOutCirc');
}



