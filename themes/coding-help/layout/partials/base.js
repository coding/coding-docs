// const host = 'http://localhost:7001/api/v1'; // localhost
// const host = 'http://operation.devcoding.cn/api/v1'; // dev
// const host = 'http://operation.staging.corp.coding.io/api/v1'; // staging
const host = 'https://operation.coding.net/api/v1'; // online
const new_host = 'https://e.coding.net/api/operating'; // online
hljs.initHighlightingOnLoad(); 

hljs.initLineNumbersOnLoad();

function throttle(action, delay) {
    var startTime = 0;

    return function () {
        var currTime = +new Date();

        if (currTime - startTime > delay) {
            action.apply(this, arguments)
            startTime = currTime;
        }
    }
}

/**
 * a 标签重写 
 * 解决带有定位参数的文档 URL 无法访问
 */
document.body.addEventListener('click', function (event) {
    var target = event.target || event.srcElement;
    if (target.nodeName.toLocaleLowerCase() === 'a') {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            window.event.returnValue = true;
        }
        var url = target.getAttribute("href")
        if (target.getAttribute("target") === '_blank') {
            window.open(url)
        } else {
            window.location.href = url
        }
    }
});

$(document).ready(function () {
    // set book nav
    (function () {
        setTimeout(function () {
            var initCopyCode = function () {
                var copyHtml = '';
                copyHtml += '<button class="btn-copy" data-clipboard-snippet="">copy</button>';

                $(".hljs").before(copyHtml);
                new ClipboardJS('.btn-copy', {
                    target: function (trigger) {
                        return trigger.nextElementSibling;
                    }
                });
            }
            initCopyCode();
        }, 0);
    })();

    // docsearch
    (function () {
        try {
            const search = docsearch({
                appId: 'D71XIE36UZ',
                apiKey: 'a2b5467ab11d9bf0f0671854ef133ef0',
                indexName: 'coding_help',
                inputSelector: '#headerSearchInput',
                debug: false // Set debug to true if you want to inspect the dropdown
            });
    
            search.autocomplete.on('autocomplete:shown', event => {
                $('.algolia-autocomplete pre').addClass('change');
            });
    
            search.autocomplete.on('autocomplete:empty', event => {
                $('.algolia-autocomplete pre').removeClass('change');
            });
    
            search.autocomplete.on('autocomplete:closed', event => {
                $('.algolia-autocomplete pre').removeClass('change');
            });
    
            $('#headerSearchInput').on('input', function (e) {
                if (e.delegateTarget.value == '') {
                    $('.algolia-autocomplete pre').removeClass('change');
                }
            })
        } catch (error) {
            console.log('docsearch CDN 文件加载失败')
        }


    })();

    // header
    $('#search-switch').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.search-content').removeClass('on');
        } else {
            $(this).addClass('on');
            $('.search-content').addClass('on');
            $('#headerSearchInput').focus();
        }
    });
    $('.header-container .icon').click(
        // eslint-disable-next-line
        function () {
            const header = $('.header-container');

            if (header.hasClass('user-expanded')) {
                header.removeClass('user-expanded');
            } else {
                header.addClass('user-expanded');
            }

        }
    );
    var ZOOM_MARGIN = 50;
    if (navigator.userAgent.match(/(phone|pod|iPhone|pad|iPad|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        ZOOM_MARGIN = 0;
        if ($('.header-container').hasClass('no-touch')) {
            $('.header-container').removeClass('no-touch');
        }

        $('.nav .nav-item.nav-drop-down-wrap').click(
            function () {
                const $this = $(this);
                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                } else {
                    $this.addClass('active').siblings().removeClass('active');
                }
            }
        )

        $('.expand-btn').addClass('expand-btn-hide');
    }

    // set book nav
    (function () {
        let helpNavLinkItem = document.querySelector('.helpNavLinkItem.isActive')
        helpNavLinkItem && helpNavLinkItem.scrollIntoView();
        if(helpNavLinkItem && helpNavLinkItem.parentNode !== null) {
            // 含有三级标题 
            if(helpNavLinkItem.parentNode.classList.contains('helpNavSecondLinks')) {
                helpNavLinkItem.parentNode.classList.add('isExpanded'); 
                helpNavLinkItem = helpNavLinkItem.parentNode;
                helpNavLinkItem.parentNode.classList.add('isExpanded');
                // 三级标题 arrow 展开
                let arrowThreeChange = helpNavLinkItem.parentNode.querySelector('.arrow')
                arrowThreeChange.classList.add('isExpanded');
                // 二级标题 arrow 展开
                helpNavLinkItem = helpNavLinkItem.parentNode;
                let arrowTwoChange = helpNavLinkItem.parentNode.querySelector('.arrow')
                arrowTwoChange.classList.add('isExpanded');
            }else {
                // 含有二级标题
                helpNavLinkItem.parentNode.classList.add('isExpanded');
                helpNavLinkItem = helpNavLinkItem.parentNode;
                let arrowChange = helpNavLinkItem.parentNode.querySelector('.arrow')
                arrowChange.classList.add('isExpanded');
            }
        }
        // 侧边栏记忆化展开
        for(let i=0;i<sessionStorage.length;i++) {
            let sessionKey = sessionStorage.key(i);
            let sessionVal = sessionStorage[sessionKey];
            let endLength = sessionVal.length;
            
            if(sessionVal === sessionKey.slice(-endLength)) {
                const $linkDom = $('.helpNavBookBody .helpNavTitle').eq(sessionVal);
                const $arrow = $linkDom.find('.arrow');
                const $helpNavLinks = $linkDom.next();
                if (!$arrow.hasClass('isExpanded')) {
                    $arrow.addClass('isExpanded');
                    $helpNavLinks.addClass('isExpanded');
                }
            }
        }
        // 记忆展开目录
        $('.helpNavBookBody .helpNavTitle').on('click', function () {
            const index = $('.helpNavBookBody .helpNavTitle').index(this);
            const $arrow = $(this).find('.arrow');
            const $helpNavLinks = $(this).next();
            if ($arrow.hasClass('isExpanded')) {
                $arrow.removeClass('isExpanded');
                $helpNavLinks.removeClass('isExpanded');
                sessionStorage.removeItem(`helpNavLinks${index}`,index);

            } else {
                sessionStorage.setItem(`helpNavLinks${index}`,index);
                $arrow.addClass('isExpanded');
                $helpNavLinks.addClass('isExpanded');
            }
        });
    })();

    // set anchors
    (function () {
        let pageAnchors = [];
        let pageAnchorsTops = [];

        getCurrentAnchors();

        // get current page anchors
        function getCurrentAnchors() {
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

        // 判断图片是否加载完成
        let t_img;
        let isLoad = true;

        isImgLoad(function () {
            pageAnchorsTops = [];
            getCurrentAnchors();
        });
        function isImgLoad(callback) {
            $('.helpArticle img').each(function () {
                if (this.height === 0) {
                    isLoad = false;
                    return false;
                }
            });

            if (isLoad) {
                clearTimeout(t_img);
                callback();
            } else {
                isLoad = true;
                t_img = setTimeout(function () {
                    isImgLoad(callback);
                }, 500);
            }
        }

        window.onload = function() {
            $(window).on("scroll", function () {
                const t = document.documentElement.scrollTop || document.body.scrollTop;
                if (t > 0) {
                    $('.header-container').addClass('isFixed');
                } else {
                    $('.header-container').removeClass('isFixed');
                }
                updateCatalogueHeight(t)
                setScrollHash(t)
            });

            var footer = $('.footer-container')[0]
            var asideMenuLeft = $('#asideMenuLeft')[0]
            var FooterHeight = footer.clientHeight
            var PageHeight = document.documentElement.offsetHeight
            var WindowHeight = window.innerHeight
            var scrollHeight = PageHeight - FooterHeight - WindowHeight
            var menuHeight = asideMenuLeft.clientHeight
            var timeout = null
            function updateCatalogueHeight(scrollTop) {
                if (window.innerWidth <= 768) return
                if (scrollTop >= scrollHeight) {
                    asideMenuLeft.style.height = menuHeight - (scrollTop - scrollHeight) + 'px'
                }
                clearTimeout(timeout)
                timeout = setTimeout(function () {
                    if (scrollTop >= scrollHeight) {
                        asideMenuLeft.style.height = menuHeight - (scrollTop - scrollHeight) + 'px'
                    } else {
                        asideMenuLeft.style.height = menuHeight + 'px'
                    }
                }, 50)
            }

            function setScrollHash(scrollTop) {
                scrollTop = scrollTop + 30;
                if (pageAnchorsTops.length) {
                    const len = pageAnchorsTops.length;
                    for (let i = len - 1; i >= 0; i--) {
                        if (scrollTop >= pageAnchorsTops[i]) {
                            setCurrentAnchor(pageAnchors[i], pageAnchorsTops[i]);
                            return;
                        }
                    }
                }
            }
        }

        function setCurrentAnchor(urlHash, offsetTop) {
            if (pageAnchors.length && pageAnchors.indexOf(urlHash) != -1) {
                const pos = pageAnchors.indexOf(urlHash);
                const $anchor = $('.helpTOCRight a');
                const len = $anchor.length - 1;
                if (len !== pos) {
                    $('.pageRight').css({ 'position': 'sticky', 'top': `105px` });
                    $('.helpTOCRight').css({ 'position': 'relative', 'top': `0px` });
                }
                $anchor.each(function (index, ele) {
                    if (index == pos) {
                        $(ele).addClass('isCurrent');
                    } else {
                        $(ele).removeClass('isCurrent');
                    }
                })
            }
        }

        $('.helpTOCRight .toc-link').on('click', function (e) {
            const href = $(this).attr('href')
            //pageAnchorsTops

            if (href.split('#').length && href.split('#')[1]) {
                const currentAnchorName = decodeURI(href.split('#')[1]);

                const scrollTop = document.getElementById(currentAnchorName).offsetTop;
                $("body,html").animate({
                    scrollTop: scrollTop
                }, 500);
            }
        });

        $('.helpArticle .article-anchor').on('click', function (e) {
            const href = $(this).attr('href')
            //pageAnchorsTops

            if (href.split('#').length && href.split('#')[1]) {
                const currentAnchorName = decodeURI(href.split('#')[1]);

                const scrollTop = document.getElementById(currentAnchorName).offsetTop;
                $("body,html").animate({
                    scrollTop: scrollTop
                }, 500);
            }
        });

        if (document.location.hash) {
            const href = document.location.hash
            //pageAnchorsTops

            if (href.split('#').length && href.split('#')[1]) {
                const currentAnchorName = decodeURI(href.split('#')[1]);

                const scrollTop = document.getElementById(currentAnchorName).offsetTop;
                $("body,html").animate({
                    scrollTop: scrollTop
                }, 500);
            }
        }

        $('.helpArticle').on('click', function(e) {
            if (e.target.nodeName === 'A' && e.target.hash.startsWith('#')) {
                e.preventDefault();
                const subTitle = decodeURI(e.target.hash.split('#')[1]);
                const target = document.getElementById(subTitle);
                if (!target) return;
                const scrollTop = target.offsetTop;
                $("body,html").animate({
                    scrollTop: scrollTop
                }, 500);
            }
        })
    })();

    const danger = (msg) => {
        $('.cuk-alert-danger').addClass('cuk-alert-sticky');
        $('.cuk-alert-danger .txt').text(msg);
        setTimeout(function () {
            $('.cuk-alert-danger').removeClass('cuk-alert-sticky');
        }, 2000)
    }

    // mobile-menu
    (function () {
        $('.helpMenuSwitch').on('click', function () {
            $('.helpNavigation').addClass('isVisible');
            $('.helpMask').addClass('isVisible');
        })
        $('.helpMask').on('click', function () {
            $('.helpNavigation').removeClass('isVisible');
            $('.helpMask').removeClass('isVisible');
        })
    })();

    // helpdoc feedback
    (function () {
        const init = () => {
            const $goodIcon = $('.fd-btn.good .icon');
            const $badIcon = $('.fd-btn.bad .icon');

            const path = window.location.href;
            const accept = localStorage.getItem(`${path}`);

            if (accept == 1) {
                $goodIcon.addClass('isActive');
                $badIcon.addClass('disable');
            } else if (accept == -1) {
                $goodIcon.addClass('disable');
                $badIcon.addClass('isActive');
            }
        }

        init();

        $('#helpdocGoodBtn').on('click', function () {
            const $goodIcon = $('.fd-btn.good .icon');
            const $badIcon = $('.fd-btn.bad .icon');
            let $badModal = document.getElementsByClassName('bad-modal');
            if ($badModal[0].style.display === 'block') {
                $('.bad-modal').css('display', 'none');
            }
            if ($goodIcon.hasClass('disable') || $goodIcon.hasClass('isActive')) return;
            const $this = $(this);
            if ($this.hasClass('disable')) return;

            let path = window.location.href;
            // if (window.location.href.indexOf('localhost') != -1) {
            //     return;
            // }
            if (window.location.href.indexOf('#') != -1) {
                path = window.location.href.split('#')[0];
            }
            if (window.location.href.indexOf('?') != -1) {
                path = window.location.href.split('?')[0];
            }

            const title = $('#pageTitle').text();
            const data = {
                title: title,
                type: 0,
                path: path,
                isGood: true
            };

            $this.addClass('disable');

            $.ajax({
                url: `${new_host}/helpdoc/laud?title=${title}&type=0&path=${path}&isGood=true`,
                type: "POST",
                success: function (res) {
                    $this.removeClass('disable');
                    if (res.code == 0) {
                        $goodIcon.addClass('isActive');
                        $badIcon.addClass('disable');
                        localStorage.setItem(`${path}`, 1);
                    } else {
                        danger('请求失败');
                    }
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $this.removeClass('disable');
                    danger('请求失败');
                    // console && console.log(errorThrown);
                }
            });
        });

        $('#helpdocBadBtn').on('click', function () {
            const $goodIcon = $('.fd-btn.good .icon');
            const $badIcon = $('.fd-btn.bad .icon');

            if ($goodIcon.hasClass('disable') || $goodIcon.hasClass('isActive')) return;

            const $this = $(this);
            if ($this.hasClass('disable')) return;

            let path = window.location.href;
            // if (window.location.href.indexOf('localhost') != -1) {
            //     return;
            // }
            if (window.location.href.indexOf('#') != -1) {
                path = window.location.href.split('#')[0];
            }
            if (window.location.href.indexOf('?') != -1) {
                path = window.location.href.split('?')[0];
            }
            const title = $('#pageTitle').text();
            const data = {
                title: title,
                type: 0,
                path: path,
                isGood: false,
            };
            $('.bad-modal').css('display', 'block');
            $this.addClass('disable');

            $.ajax({
                url: `${new_host}/helpdoc/laud?title=${title}&type=0&path=${path}&isGood=false`,
                method: "POST",
                success: function (res) {
                    $this.removeClass('disable');
                    if (res.code == 0) {
                        $goodIcon.addClass('disable');
                        $badIcon.addClass('isActive');
                        localStorage.setItem(`${path}`, -1);
                    } else {
                        danger('请求失败');
                    }
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $this.removeClass('disable');
                    danger('请求失败');
                    // console && console.log(errorThrown);
                }
            });
        });
    })();

    $('.btn').on('click', function() {
        let radioVal = $("input[type='radio']:checked").val();
        let path = window.location.href;
        let textArea = $('.txt-area').val();
        if (!radioVal && !textArea) {
            danger('请选择问题类型或反馈填写后提交');
            return
        }
        const $this = $(this);
        // if (window.location.href.indexOf('localhost') != -1) {
        //     return;
        // }
        if (window.location.href.indexOf('#') != -1) {
            path = window.location.href.split('#')[0];
        }
        if (window.location.href.indexOf('?') != -1) {
            path = window.location.href.split('?')[0];
        }
        const data = {
            question: radioVal,
            path: path,
            feedback: textArea,
        };
        $.ajax({
            url: `${new_host}/helpdoc/feedback?question=${radioVal}&path=${path}&feedback=${textArea}`,
            type: "POST",
            success: function (res) {
                if (res.code !== 0) {
                    danger('请求失败');
                } else {
                    $('.bad-modal').css('display', 'none');
                }
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $this.removeClass('disable');
                danger('请求失败');
                // console && console.log(errorThrown);
            }
        });
    });

    $('.cancel-btn').on('click', function() {
        $('.bad-modal').css('display','none');
    });


    $('.expand-btn').on('click', function () {
        var outter = document.getElementById('TableModal');
        var inner = document.getElementById('TableModalContent');
        var table = this.parentNode.lastChild;
        inner.appendChild(table.cloneNode(true));
        outter.classList.add('tableModalZIndex');
        setTimeout(() => {
            outter.classList.add('tableModalShow');
        }, 100);
    });

    $('#TableModal').on('click', closeModal);

    function closeModal(e) {
        var id = e.target.id;
        if (id !== 'TableModal' && id !== 'TableModalContent' && id !== 'ModalClose' && id !== 'ModalClosePath') return;
        var outter = document.getElementById('TableModal');
        var inner = document.getElementById('TableModalContent');
        outter.classList.remove("tableModalShow");
        setTimeout(() => {
            outter.classList.remove("tableModalZIndex");
            inner.innerText = '';
        }, 150);
    }

    var pageTitle = $('#pageTitle')[0].innerText;
    var readNumEle = $('#READNUM')[0];
    $.ajax({
        url: `${host}/helpdoc/getcount?name=${pageTitle}`,
        type: "get",
        dataType: "JSON",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function (res) {
            if (res.code == 0) {
                var count = res.data.count;
                if (count < 100) return;
                readNumEle.innerText = `阅读 ${count}`;
            }
        },
    });
    $.ajax({
        url: `${host}/helpdoc/addcount`,
        type: "post",
        data: { name: pageTitle },
        dataType: "JSON",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
    });

    if (location.pathname.indexOf('best-practices') !== -1) {
        var backTitle = document.getElementById('backTitle');
        if (!backTitle) return;
        backTitle.innerText = '最佳实践页';
        var helpNavHeading = document.getElementsByClassName('helpNavHeading')[0].children[0];
        helpNavHeading.setAttribute('href', '/docs/best-practices/overview.html');
    }

    mediumZoom(document.querySelectorAll('.zoom-img'), {
        background: 'rgba(0, 0, 0, 0.5)',
        margin: ZOOM_MARGIN,
    })

    // 添加最近更新
    setTimeout(function () {
        if (!dayjs) return
        const UpdateTime = document.getElementById('UpdateTime')
        if (!UpdateTime) return
        const RecentUpdate = document.getElementById('RecentUpdate')
        if (!RecentUpdate) return

        dayjs.extend(window.dayjs_plugin_relativeTime)
        dayjs.locale('zh-cn')
        const relativeTime = dayjs(UpdateTime.innerText, "YYYYMMDD").fromNow()
        RecentUpdate.innerText = RecentUpdate.innerText + ' ' + relativeTime
    }, 500);

    // remove query string such as _ga
    (function () {
        if (document.location.search && history.replaceState) {
            window.history.replaceState({},'', window.location.protocol + "//" + window.location.host + window.location.pathname + document.location.hash);
        }
    })();
});

window.COMMON_ACTUATOR = function(actuator) {
    actuator(3);
}

