/* global hexo */

'use strict';
var _ = require('lodash');
var cheerio = require('cheerio');
var ejs = require('ejs');
var { footer, url } = require('@coding-operation/public-component-web');

hexo.extend.helper.register('page_anchor', function (str) {
  var $ = cheerio.load(str, { decodeEntities: false });
  var headings = $('h3, h4');

  if (!headings.length) return str;

  headings.each(function () {
    var id = $(this).attr('id');

    $(this)
      .addClass('article-heading')
      .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
  });

  return $.html();
});


hexo.extend.helper.register('footer', function () {
  return ejs.render(footer.html, {
    isDarkBanner: false,
    projectId: 3,                                     // 官网 —— 1，帮助中心首页 —— 2， 帮助中心文档页 —— 3, 洞见 —— 4
  });
});

hexo.extend.helper.register('footerJS', function () {
  return `<script src="${url.js}"></script>`;
});

hexo.extend.helper.register('footerCSS', function () {
  return `<link href="${url.css}" rel="stylesheet">`;
});

/**
 *  文章面包屑
 *  
 * */
let breadcrumbArr = [];
const config = hexo.config
const breadcrumb = hexo.config.breadcrumb.display
hexo.extend.helper.register('breadcrumb', function(data, path){
  if(!breadcrumb) return;
  if(breadcrumbArr.length === 0) {
    breadcrumbArr = data;
  }
  const { sitemap } = breadcrumbArr;
  let bookClassify = {}; // 总分类
  let categoryClassify = {}; // 侧边栏分类 | 选中项
  let sectionClassify = {}; // 侧边栏选中项
  let thirdTitle = ''; // 三级目录标题
  let thirdLevel = false; // 是否三级选中项
  for(const book of sitemap) {
    const isCurrentBook = new RegExp(`^${book.path}`).test(path)
    if(isCurrentBook === true) {
      bookClassify = book;
      let isCurrentCategory = false;
      let isCurrentSection = false;
      for(const category of book.categories) {
        if(category.path && !category.links) {
          isCurrentCategory = new RegExp(`^${category.path}`).test(path);
          if(isCurrentCategory === true) {
            categoryClassify = category;
          }
        } else {
          for(const link of category.links) {
            if(!link.sections) {
              if(link.path === path) {
                categoryClassify = category;
                sectionClassify = link;
              }
            }else {
              // 含有三级目录
              for(const section of link.sections) {
                isCurrentSection= new RegExp(`^${section.path}`).test(path)
                if(isCurrentSection === true) {
                  categoryClassify = link.sections;
                  thirdTitle = link.title;
                  sectionClassify = section;
                  thirdLevel = true;
                }
              }
            }
          }
        }
      }
    }
  }
  let bookClassifyText = bookClassify.compendium;
  let categoryClassifyText = thirdLevel? thirdTitle : categoryClassify.title;
  let categoryClassifyLink = thirdLevel? categoryClassify[0].path : categoryClassify.links ? categoryClassify.links[0].path : categoryClassify.path;
  let bookClassifyLink = '';
  if(thirdLevel) {
    if(bookClassify.categories) {
      if(bookClassify.categories[0].links) {
        bookClassifyLink = bookClassify.categories[0].links[0].path;
      }
    }
  }else {
    bookClassifyLink = bookClassify.categories ? bookClassify.categories[0].path : categoryClassifyLink;
  }
  let sectionClassifyText = sectionClassify.title;
  // 默认总分类为当前文章第一篇
  if(bookClassifyLink === undefined && categoryClassifyLink === undefined) {
    if(bookClassify.categories && bookClassify.categories.length >=1) {
      categoryClassifyLink = bookClassify.categories[0].path || bookClassify.categories[0].links[0].path;
    }
  }
  let breadcrumbRes = `<a href="${config.root || ''}${bookClassifyLink || categoryClassifyLink}">${bookClassifyText}</a>`;
  if(categoryClassifyText != undefined) {
    breadcrumbRes += ` / <a href="${config.root || ''}${categoryClassifyLink}">${categoryClassifyText}</a>`;
  }
  // 还未分类的文章不显示当前选中项文本
  if(sectionClassifyText != undefined) {
    breadcrumbRes +=  ` / <span>${sectionClassifyText}</span>`;
  }
  return breadcrumbRes;
})