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
    console.log("test")
    var link = document.getElementById("links");
    console.log(this);
    console.log(this.xhr.myText.response.results.length);
    for (i = 0; i < this.xhr.myText.response.results.length; i += 1){
      console.log(this.xhr.myText.response.results[i].webTitle)
      link.innerHTML += "<li><a href=\"#\">" + this.xhr.myText.response.results[i].webTitle + "</li></a>";
    };
  }

  exports.NewsController = NewsController;

})(this);
