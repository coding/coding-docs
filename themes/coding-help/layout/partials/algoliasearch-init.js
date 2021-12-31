;(function () {
  var client = algoliasearch('9488ENB81Z', '8cd7d4251ad9bcd7d471b8b10e5e9d88')
  var index = client.initIndex('coding-help-master')

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
        return `<a href="${suggestion.permalink}"><span class="tit">${suggestion.title}</span></a>`
      },
      empty: function () {
        return '<span class="aa-empty">无相关搜索结果</span>'
      },
    },
  }).on('autocomplete:selected', function (event, suggestion, dataset) {
    window.location.href = suggestion.permalink
  })

})()
