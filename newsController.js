(function(exports){

  function NewsController(){

  };

  NewsController.prototype.requestNews = function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?show-fields=body&from-date=2017-01-01&q=javascript", true)
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        this.myText = JSON.parse(xhr.responseText);
        var link = document.getElementById("links");
        console.log(this.myText.response.results.length);
        for (i = 0; i < this.myText.response.results.length; i += 1){
          console.log(this.myText.response.results[i].webTitle)
          link.innerHTML += "<li><a href=\"#\">" + this.myText.response.results[i].webTitle + "</li></a>";
        };

        console.log(this.myText);
      }
    };

    xhr.send();

  };

  exports.NewsController = NewsController;

})(this);
