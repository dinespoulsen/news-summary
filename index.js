var newsController = new NewsController();
window.addEventListener("hashchange", newsController.showArticle.bind(newsController));
newsController.requestNews("business", newsController.updateViewList.bind(newsController));
