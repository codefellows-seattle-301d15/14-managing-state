(function(module) {
  var articleController = {};

  Article.createTable();

// ctx.articles.length is an array created by the loadById function which ran first
// ctx is an object (the second function was called by 'next')
  articleController.index = function(ctx, next) {
    if(ctx.articles.length) {
      articleView.index(ctx.articles);
    } else {
      page('/');
    }
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // load all your articles and push to the articleData array
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loads the articles by author into the index which displays all the articles of that author
  //Database query  authorName is a paramater on ctx - it's an arbitrary name but it must match the authorName in the routes.js filter
  // call the authorData function passing in the authorData in to the next function (index)
  articleController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // loads the articles by category into the index which displays all the articles of that category
  //
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
    // categoryName comes from the url in the routes.js file
    // categoryData is a callback function to findWhere
    // 
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // this function loads all the articles into the article array, then the index function displays all the articles.
  articleController.loadAll = function(ctx, next) {
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
