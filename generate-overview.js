/**
 * 用于生成最佳实践页面的概览页
 */
var fs = require('fs');
var path = require('path');
var minify = require('html-minifier').minify;
var BEST_PRACTICES_DATA = require('./source/_data/best-practices.json');

var args = process.argv.slice(2)
var isProd = args.length > 0 && args[0] === 'prod';

var DATA = BEST_PRACTICES_DATA;
var fileReadPath = path.resolve('source/_data/overview.html');
var fileWritePath = path.resolve(`${isProd ? 'public' : 'source'}/best-practices/overview.html`);

var html = fs.readFileSync(fileReadPath, { encoding: 'utf8' });

var tabStr = '<div class="tab-wrapper"><div class="tab-inner">';

var tabContentStr = '<div class="tab-content-outter"><div class="tab-content-wrapper">';

for (var i = 0; i < DATA.length; i++) {
    var tab = DATA[i];
    var isIndex0 = i === 0;
    // 拼接 tab 字符串
    tabStr += `
            <div class="tab-item ${isIndex0 ? 'show' : ''}" data-index="${i}">
                ${tab.sort}
                <span class="tab-indicator"></span>
            </div>
        `;
    // 拼接 tabContent 字符串
    tabContentStr += `<div class="tab-content ${isIndex0 ? 'show' : ''}">`;
    // list的长度大于6，添加 查看更多
    var list = tab.list;
    var len = list.length;
    var isOverSix = len > 6;
    if (isOverSix) {
        tabContentStr += `<div class="more-btn" data-index="${i}">查看更多</div>`;
    }
    // 遍历list         
    for (var j = 0; j < len; j++) {
        var item = list[j];
        tabContentStr += `
                <a href="${item.link}">
                    <div class="tab-content-item ${j >= 6 ? 'hide' : ''}">
                        <img src="../images/best-practice/${item.image}" alt="">
                        <div class="tab-content-inner">
                            <div class="up">
                                <span>${item.image_title}</span>
                            </div>
                            <div class="down">
                                <div class="down-up">
                                    <h4>${item.title}</h4>
                                    <p>${item.introduction}</p>
                                </div>
                                <div class="down-down">
                                    <span>${item.author}</span>
                                    <span>${item.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
    }
    var padNum = len % 3;
    padNum = padNum === 1 ? 2 : 1;
    for (var k = 0; k < padNum; k++) {
        tabContentStr += `<div class="tab-content-item none ${isOverSix ? 'hide' : ''}"></div>`;
    }
    tabContentStr += '</div>';
}

tabStr += '</div></div>';
tabContentStr += '</div></div>';

html = html.replace('<!-- TAB -->', tabStr).replace('<!-- TABCONTENT -->', tabContentStr);

fs.writeFileSync(fileWritePath, minify(html, {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true,
}));

console.log('success');