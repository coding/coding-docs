'use strict';
var CleanCSS = require('clean-css');

/**
 * 注册一个过滤器
 * 如果md文件中包含 xml 代码
 * 将 < 和 > 替换成 &lt; 和 &gt;
 */
hexo.extend.filter.register('before_post_render', function (data) {
    data.content = data.content.replace(/```[^]*BRACKET-FILTER[^]*?```/, function (match) {
        return match.replace(/<([^]+?)>/g, function (match, $1) {
            return `&lt;${$1}&gt;`;
        });
    });
});


/**
 * 过滤器
 * 给 table 添加一个包装 div 和 按钮，点击按钮全屏现实 table
 */
hexo.extend.filter.register('after_post_render', function (data) {
    data.content = data.content
        .replace(/<table>[^]+?<\/table>/g, function (match) {
            return '<div class="table-wrap">' +
                '<span class="expand-btn">' +
                '<svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="25px" width="25px" viewBox="0 0 18 18" class="cuk-icon cuk-icon-expand null" style="vertical-align: middle;" id="fuck"><g><path d="m15.0292969 2.81425781-3.3257813.41308594c-.1160156.0140625-.1634765.1546875-.0826172.23730469l.9615235.96152343-2.69824221 2.69824219c-.05449219.05449219-.05449219.14414063 0 .19863281l.79277341.79277344c.0544922.05449219.1441407.05449219.1986328 0l2.7-2.7.9615235.96152344c.0826172.08261719.2232422.03339844.2373047-.08261719l.4113281-3.32402344c.0123047-.09140625-.0650391-.16875-.1564453-.15644531zm-7.70625002 7.06992188c-.05449219-.05449219-.14414063-.05449219-.19863282 0l-2.69824218 2.70000001-.96152344-.9615235c-.08261719-.0826171-.22324219-.0333984-.23730469.0826172l-.41308594 3.3240235c-.01054687.0914062.06503907.1669922.15644532.1564453l3.32578125-.413086c.11601562-.0140625.16347656-.1546875.08261718-.2373046l-.96152343-.9615235 2.7-2.7c.05449218-.0544922.05449218-.1441406 0-.1986328z"></path></g></svg>' +
                '</span>' + match + '</div>';
        })
        .replace(/<img/g, '<img class="zoom-img"');
});

/**
 * 转化最近更新时间
 */
hexo.extend.filter.register('after_post_render', function (data) {
    data.content = data.content.replace(/====[^]+?====/g, function (match) {
        const arr = match.trim().split('====')
        if (arr.length !== 3) return ''
        const timeStr = arr[1].trim()
        if (!timeStr.includes('/')) return ''
        const timeArr = timeStr.split('/')
        if (timeArr.length !== 3) return ''
        return `<span id='UpdateTime' style='display: none'>${timeArr[0].trim()}${timeArr[1].trim()}${timeArr[2].trim()}</span>`
    })
});

/**
 *  压缩 css
 *  
 * */
hexo.extend.filter.register('after_render:css', function (str, data) {
    var output = new CleanCSS({}).minify(str);
    if (output.errors.length) console.log(output.errors)
    return output.styles;
});
