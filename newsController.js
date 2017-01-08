(function(exports){

  function NewsController(){

  };

  NewsController.prototype.requestNews = function(search, updateViewList){
    this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?show-fields=body&from-date=2017-01-01&q=" + search, true)
    this.xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        this.myText = JSON.parse(this.responseText);
        updateViewList();
        var link = document.getElementById("links").style.display = "block";
      }
    };
    this.xhr.send();
  };

  NewsController.prototype.updateViewList = function(){
    var link = document.getElementById("links");
    for (i = 0; i < this.xhr.myText.response.results.length; i += 1){
      link.innerHTML += "<li><a id=\"link\" href=\"#articles/" + i + "\">" + parseInt(i + 1)+ ": " + this.xhr.myText.response.results[i].webTitle + "</li></a>";
    };
  }

  NewsController.prototype.showArticle = function(){
    this.findArticle();
    var article = document.getElementById("article");
    var headline = document.getElementById("headline");
    headline.style.display = "block";
    article.style.display = "block";

  };

  NewsController.prototype.findArticle = function(){
    var newsArticleId = window.location.hash.split("/")[1];
    var article = document.getElementById("article");
    var headline = document.getElementById("headline");
    console.log(this.xhr.myText.response.results[newsArticleId].webTitle)
    article.innerHTML = this.xhr.myText.response.results[newsArticleId].fields.body;
    headline.innerHTML = this.xhr.myText.response.results[newsArticleId].webTitle;
  };

  exports.NewsController = NewsController;

})(this);
