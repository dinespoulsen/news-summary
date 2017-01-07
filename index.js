var newsController = new NewsController();
newsController.requestNews("javascript", newsController.updateViewList.bind(newsController));
