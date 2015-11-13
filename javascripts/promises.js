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
  ["jquery", "hbs", "lodash", "bootstrap", "books_data", "category_data", "unique-types", "filter"], 
  function($, Handlebars, _, bootstrap, bookData, typeData, uniqueTypes, filter) {

    var Types = {};
    // var Books = {};
    // var Final = {};

    typeData()
    .then( function(types) {
      Types = types;
      console.log("Types", Types);
      return bookData();
    })
    .then( function(books) {
      // Books = books;
      console.log("Types2", Types);
      // console.log("Books", Books);
      Types = Object.keys( Types ).map(key => Types[ key ]);
      books = Object.keys( books ).map(key => books[ key ]);
      console.log("TypesArray", Types);
      // console.log("BooksArray", Books);
      books.map(book => {
      book.type = _.find(Types, { id:book.booktype }).label;
      console.log("book", book);
      return book;
      });
      // console.log("Final", Final);

      var unique = uniqueTypes(books);
      console.log("unique", unique);
      require(['hbs!../templates/select'], function (selectTemplate) {
        $("#select").html(selectTemplate(unique));
      });

      require(['hbs!../templates/books'], function (bookTpl) {
        $("#bookList").html(bookTpl({books}));
      });
    })
    .fail( function(error) {
      console.log("error", error);
    });
    console.log("FinalOutside");


  }
);
