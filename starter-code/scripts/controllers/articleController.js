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
  // the loadById function instantiates the findWhere function with three parameters. It takes the id which is the row of the context object(sql table), the key values inside the context object (the SQL id numbers), and the articleData() as a callback function which was defined above on line 17. The end result is a database query that loads all the ctx.articles.
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Article.findWhere takes the author column, the context path '/author/:authorName' where all authorName(s) become the context their cell data is replaced as '+' and ' '.
  // authorData is called and passed to the next function.
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
  // Passes the 'category' title into the field SQL field search
  // to return only category fields.
  // The ctx.params.categoryName ('/category/:categoryName') from
  // the .json file gets passed through as the data into the SQL database.
  // categoryData is called back and sets the context to be called transferred
  // on to the next function  
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // loadAll uses the context of load all to set a variable function so that ctx.articles = Article.allArticles. If Article.allArticles does not have length (does not exist) our else statement sets the context = Article.allArticles calling the articleData(); and passing it to Article to create Article.allArticles. Next we pass this data to the next function.
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
