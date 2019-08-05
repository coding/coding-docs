$(document).ready(function () {

    // header
    $('#search-switch').on('click', function(){
        if($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.search-content').removeClass('on');
            $('.header-container .logo').removeClass('off');
        } else {
            $(this).addClass('on');
            $('.header-container .logo').addClass('off');
            $('.search-content').addClass('on');
        }
    });

    // set book nav
    (function(){
        $('.helpNavBookArea .helpNavBook .helpNavBookHead').on('click', function(e){
            const $bookList = $('#helpNavBookListArea');
            
            if ($bookList.css('display') == 'none') {
                $bookList.slideDown();
            } else {
                $bookList.slideUp();
            }
            
        });

        $('.helpNavBookBody .helpNavSection .helpNavTitle').on('click', function(){
            const $parent = $(this).parent('.helpNavSection');
            if ($parent.hasClass('isExpanded')) {
                $parent.removeClass('isExpanded');
            } else {
                $parent.addClass('isExpanded');
            }
        });
    })();

    // set anchors
    (function(){
        let pageAnchors = [];
        let pageAnchorsTops = [];

        let isAnchorClicked = false;

        getCurrentAnchors();

        // get current page anchors
        function getCurrentAnchors () {
            const targetOl = document.querySelectorAll('.helpTOCRight ol.toc')
            if (targetOl.length) {
                const anchors = targetOl[0].querySelectorAll('a')
                for (let i = 0; i < anchors.length; i++) {
                    if (anchors[i].href.split('#').length && anchors[i].href.split('#')[1]) {
                        const currentAnchorName = decodeURI(anchors[i].href.split('#')[1])
                        pageAnchors.push(currentAnchorName)
                        pageAnchorsTops.push(document.getElementById(currentAnchorName).offsetTop)
                    }
                }
            }
        }

        $(window).on("scroll", function () {
            const t = document.documentElement.scrollTop || document.body.scrollTop;
            if(t > 0) {
                $('.header-container').addClass('isFixed');
            } else {
                $('.header-container').removeClass('isFixed');
            }
            setScrollHash(t);
        });

        function setScrollHash (scrollTop) {
            if(pageAnchorsTops.length) {
                const len = pageAnchorsTops.length;
                for (let i = len - 1; i >= 0; i--) {
                    if(scrollTop >= pageAnchorsTops[i]) {
                        setCurrentAnchor(pageAnchors[i]);
                        return;
                    }
                }
            }
        }

        function setCurrentAnchor (urlHash) {
            if (pageAnchors.length && pageAnchors.indexOf(urlHash) != -1) {
                const pos = pageAnchors.indexOf(urlHash);
                const $anchor = $('.helpTOCRight a');
                $anchor.each(function(index, ele) {
                    if (index == pos) {
                        $(ele).addClass('isCurrent');
                    } else {
                        $(ele).removeClass('isCurrent');
                    }
                })
            }
        }
    })();

})