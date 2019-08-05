;(function () {
  var client = algoliasearch('9SH8TAZLKN', '40c18c80bdca810ac9e7fcf7a50a9091')
  var index = client.initIndex('coding-help')

  autocomplete('#headerSearchInput', {
    hint: false,
    autoselect: true,
  }, {
    source: autocomplete.sources.hits(index, {
      hitsPerPage: 5,
    }),
    //value to be displayed in input control after user's suggestion selection
    displayKey: function (suggestion) {
      return suggestion.title 
    },
    //hash of templates used when rendering dataset
    templates: {
      suggestion: function (suggestion) {
        return `<a href="${suggestion.url}"><span class="tit">${suggestion.title}</span><span class="subtit">${suggestion.subTitle}</span></a>`
      },
      empty: function () {
        return '<span class="aa-empty">没有相关的数据</span>'
      },
    },
  }).on('autocomplete:selected', function (event, suggestion, dataset) {
    window.location.href = suggestion.url
  })

})()
