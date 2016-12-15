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
  //Runs through the article object and loads each article by using .findwhere
  //constructs a sql query  and finding the id first.
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //loads data from finding the author by selected author and uses corresponding
  // articles, replacing any data with current author information. Passes
  //through CTX and replaces all + with the author name. next goes to next
  //function in order to continue on accessing ctx in next function.
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
  //Takes categories within the article, finds the category and then
  //loads the articles in said category, comes from url cat name.
  //call next goes up and renders out like before.
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //fetches all the article data and then loads all data without filtering.
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
