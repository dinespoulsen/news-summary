(function(exports){

  function NewsController(){

  };

  NewsController.prototype.requestNews = function(search, updateViewList){
    this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?show-fields=body&from-date=2017-01-01&q=" + search, true)
    this.xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        this.myText = JSON.parse(this.responseText);
        console.log(this.myText);
        updateViewList();
        var link = document.getElementById("links").style.display = "block";
      }
    };
    this.xhr.send();
  };

  NewsController.prototype.updateViewList = function(){
    var link = document.getElementById("links");
    for (i = 0; i < this.xhr.myText.response.results.length; i += 1){
      link.innerHTML += "<li><a id=\"link\" href=\"#articles/" + i + "\">" + parseInt(i + 1)+ ": " + this.xhr.myText.response.results[i].webTitle.slice(0,60) + "...</li></a>";
    };
  }

  NewsController.prototype.showArticle = function(){
    this.findArticle();
    var article = document.getElementById("article");
    var headline = document.getElementById("headline");
    var date = document.getElementById("publication-date");
    headline.style.display = "block";
    article.style.display = "block";
    date.style.display = "block";
  };

  NewsController.prototype.findArticle = function(){
    var newsArticleId = window.location.hash.split("/")[1];
    var article = document.getElementById("article");
    var headline = document.getElementById("headline");
    var date = document.getElementById("publication-date");
    article.innerHTML = this.xhr.myText.response.results[newsArticleId].fields.body;
    headline.innerHTML = this.xhr.myText.response.results[newsArticleId].webTitle;
    date.innerHTML = "Publicated: " + this.xhr.myText.response.results[newsArticleId].webPublicationDate;
  };

  exports.NewsController = NewsController;

})(this);
