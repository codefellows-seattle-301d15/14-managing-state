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
  // First a new function is created and stored in a variable named, articleData. Since Article.findWhere expects a callback as its third argument, we can pass articleData as our third argument. Since we've used 'article' as our parameter in articleData, it will be pointing to the Article object inside of our Article.findWhere query. By passing this reference to ctx.articles as a property, we can use ctx in our next function, articleController.index; ctx.articles is an array.
  articleController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //This method is called when the url displays a specific author by selecting them in the dropdown menu. An anonymous function is stored in authorData. This is done so we can pass it as the third argument to the Article.findWhere method; Once again we create a ctx.article property to be stored by reference to the parameter articlesByAuthor. When the authorData function is called in Article.findWhere, the articlesByAuthor parameter that we created will be pointing to the Article object when Article.findWhere is invoked.
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
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //This function is invoked when our we are at our home page. Much like the other two controller methods that load our data. We store an anonymous function within a variable named articleData. This time the function stores a reference to the Article.allArticles array on the context object's 'articles' property. The next conditional statement will check if there are any Articles in the allArticles array. If so, the reference to that article array will be stored on the ctx object's property. If not, the Article.fetchAll method will be invoked with the articleData function passed as our paramater.
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
