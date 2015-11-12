requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../lib/bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    "firebase": {
        exports: "Firebase"
    }
  }
});

requirejs(
  ["jquery", "hbs", "bootstrap", "get-books", "books_data", "category_data"], 
  function($, Handlebars, bootstrap, books, bookData, typeData) {

    typeData.getBookType()
    .then( function(types) {
      return bookData.getBooks(types);
    })
    .then( function(books) {
      console.log("newbooks", books);
      require(['hbs!../templates/books'], function(bookTpl) {
        $("#bookList").html(bookTpl({ books }));
      });
    })
    .fail( function(error) {
      console.log("error", error);
    });
    

    // books.load(function(bookArray) {
    //   require(['hbs!../templates/books'], function(bookTpl) {
    //     $("#bookList").html(bookTpl({ books:bookArray }));
    //   });
    // });

    /* Here's some pseudo-code for how it should look once you
       start using promises

    getBookTypes()
      .then(function(types) {
        getBooks(types);
      })
      .then(function(books) {
        // add the type key to each book that is currently
        // being performed in the get-books file

        // then bind the template to the data 
        // (p.s. make the handlebar template a module dependency)
        require(['hbs!../templates/books'], function(bookTpl) {
          $("#bookList").html(bookTpl({ books:bookArray }));
        });

      })
     */

  }
);
