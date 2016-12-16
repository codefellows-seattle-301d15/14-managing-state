(function(module) {
  var articleController = {};

  Article.createTable();

  articleController.index = function(ctx, next) {
    if(ctx.articles.length) {
      articleView.index(ctx.articles);
    } else {
      page('/');
    }
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // First the variable articleData is createed that passes a placeholder argument that is set to be equal to the articles property of the context object. This variable is the callback function that is passed through the Article.findWhere function, which creates a SQL querey to match the 'id' value entered against the 'id' parameter of the context objects
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Similar to the loadById, this sets the variable authorData as the callback function that is passed through the Article.findWhere method. Article.findWhere creates a SQL querey that takes the user entered value and attempts to match it with the same value, only it replaces the "+" character with a space..
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
  // Again,similar to the loading by category and id, only this time we are querying our table of article data for entries that have the parameter of categoryName that matches the value entered by the user
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Article.allArticles is an empty array to begin with. This function cycles through the article data and creates an object repsentation of each entry and loads it into the array before moving on to the next function. If data doesn't already exist, it fetches the data from the JSON.
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
