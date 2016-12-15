page('/',
  articleController.loadAll,
  articleController.index);

page('/about', aboutController.index);

page('/admin', adminController.index);

page('/article/:id',
  articleController.loadById,
  articleController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

page('/author/:authorName',
  articleController.loadByAuthor,
  articleController.index);

page('/category/:categoryName',
  articleController.loadByCategory,
  articleController.index);

// the * is a wildcard...if the above functions don't match anything then it will return 'not found'
page('*', function(){
  $('body').text('Not found!');
});

page();
