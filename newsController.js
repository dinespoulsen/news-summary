(function(exports){

  function NewsController(){

  };

  NewsController.prototype.requestNews = function(search, updateViewList){
    this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?show-fields=all&from-date=2017-01-01&q=" + search, true)
    this.xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        this.myText = JSON.parse(this.responseText);
        updateViewList();
        console.log(this.myText);
        var link = document.getElementById("links").style.display = "block";
      }
    };
    this.xhr.send();
  };

  NewsController.prototype.updateViewList = function(){
    var link = document.getElementById("links");
    for (i = 0; i < this.xhr.myText.response.results.length; i += 1){
      link.innerHTML += "<li><a class=\"summary\" id=\"link\" href=\"#articles/" + i + "\">" + parseInt(i + 1)+ ": " + this.xhr.myText.response.results[i].webTitle.slice(0,60) + "...<div class=\"info\">summary: </div></li></a>";
    };
    this.addMouseOver();

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

  NewsController.prototype.addMouseOver = function(){
    var links = document.getElementsByClassName("summary");
    for (i = 0; i < links.length; i += 1){
      links[i].onmousemove = function(e){
        var summary = document.getElementsByClassName("info");
        var newsArticleId = this.attributes.href.value.split("/")[1];
        summary[newsArticleId].innerHTML = newsController.xhr.myText.response.results[newsArticleId].fields.bodyText.slice(0,400) + "...";
        summary[newsArticleId].style.display = "block";
        summary[newsArticleId].style.left = e.clientX + 10;
        summary[newsArticleId].style.top = e.clientY + 10;
      };
      links[i].onmouseleave = function(){
        var span = document.getElementsByClassName("info");
        var newsArticleId = this.attributes.href.value.split("/")[1];
        span[newsArticleId].style.display = "none";
      };
    };
  };

  exports.NewsController = NewsController;

})(this);
