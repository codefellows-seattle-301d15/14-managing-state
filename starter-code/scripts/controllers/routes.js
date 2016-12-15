page('/',
  articleController.loadAll, //loads all articles
  articleController.index);

page('/about', aboutController.index); //calls index from about section

page('/admin', adminController.index); //calls index from admin section

page('/article/:id',
  articleController.loadById, //middleware filter by id
  articleController.index);

// Redirect home if the default filter option is selected:
page('/category', '/'); //sends user to homepage
page('/author', '/'); //sends user to homepage

page('/author/:authorName',
  articleController.loadByAuthor, //middleware filter by author
  articleController.index);

page('/category/:categoryName',
  articleController.loadByCategory, //middleware filter by category
  articleController.index);

page('*', function(){
  //if the user tries to type in a route that doesn't exist
  $('body').text('Not found!');
});

page(); //calls page function
