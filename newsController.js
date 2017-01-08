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
    var article = document.getElementById("article");
    article.style.display = "block";
    this.findArticle();
  };

  NewsController.prototype.findArticle = function(){
    var newsArticleId = window.location.hash.split("/")[1];
    var element = document.getElementById("article");
    element.innerHTML = this.xhr.myText.response.results[newsArticleId].fields.body;
  };

  exports.NewsController = NewsController;

})(this);
