$(".btn-clear").on("click", function(e) {
    e.preventDefault()
    $('.search-results').empty()
})
 $(".btn-search").on("click", function(e) {
     e.preventDefault()
     $('.search-results').empty()
  var apiKey = '04uTPjbkMKWQxy9CIOskQv50dOdJe5uV'
  var searchWord =  $('#keywords').val()
  var limit = $('#limitSelector').val()
  var start = $('#startYear').val()
  var end = $('#endYear').val()
  var newQuery = '&fq=pub_year:'
  
  var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchWord + '&api-key=' + apiKey

  if(start > 1600 ){    
    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchWord + newQuery + start + '&api-key=' + apiKey
  }
  if(end > 1600 ){    
    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchWord + newQuery + end + '&api-key=' + apiKey
  }

  console.log(start)
  
  $.ajax({
      url: queryURL,
      method: "GET"
  })
  .then(function(response){
      console.log(response)
      var results = response.response.docs
      console.log(results)
      console.log(limit)
    for (var i =0; i < limit; i++ ){
      var newCard = $("<div>")
      var newArticle = $("<div>")
      var title = $('<h5>')
      var link = $('<a>').text(results[i].headline.main) 
      var abstract = $('<p>').text(results[i].abstract)
        newCard.attr('class', 'card')
        abstract.attr("class", "card-text")
        title.attr("class", "card-title")
        link.attr("href", results[i].web_url)
        title.append(link)
        newArticle.append(title)
        newArticle.append(abstract)
        newArticle.attr("class", 'card-body')
        newCard.append(newArticle)
        $('.search-results').prepend(newCard)
        

      }
  })

 })