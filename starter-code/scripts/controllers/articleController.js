(function(module) {
  var articleController = {};

  Article.createTable();

  articleController.index = function(ctx, next) {
    if(ctx.articles.length) { // "ctx" (object) created in .loadAll
      articleView.index(ctx.articles);
    } else {
      page('/');
    }
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articleController.loadById = function(ctx, next) {
    //middleware function with context and next parameter
    //execution path page -> loadById -> findWhere (uses SQL command
    //to check 3 parameters to pull JSON file )-> index adds context
    //to the view -> articleView.index shows the article
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articleController.loadByAuthor = function(ctx, next) {
    //context and next letting us know it's a middleware function
      //execution path page -> loadByAuthor ->
      //.findWhere filters articles based on author name
      //index adds the context to the view -> articleView.index
      //shows the article
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
      //filters articles based on author and then follows up with article.index
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articleController.loadByCategory = function(ctx, next) {
    //context and next let us know that it's a middleware function
    //execution path page -> loadByCategory ->
    //.findWhere filters articles based on category name
    //index adds the context to the view -> articleView.index
    //shows the article
    var categoryData = function(articlesInCategory) {
      //filters articles by category and calls article.index to populate page
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articleController.loadAll = function(ctx, next) {
    //"ctx" is context; "next" lets you know it's a middleware function
    //execution path page -> loadAll ->
    //index adds the context to the view -> articleView.index
    //shows the article
    //fetchAll fetches all the articles from the JSON file
    var articleData = function(allArticles) {
      ctx.articles = Article.allArticles;
      next();
    };

    if (Article.allArticles.length) {
      ctx.articles = Article.allArticles;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articleController = articleController;
})(window);
