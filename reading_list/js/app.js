App = Ember.Application.create();

App.Router.map(function() {
  this.resource('book', { path: '/books/:book_id' });
  this.resource('genre', { path: '/genre/:genre_id' });
  this.resource('reviews', function(){
    this.route('new');
  });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({ // this allows us to specify 2 models
      books: this.store.findAll('book'),
      genres: this.store.findAll('genre'),
    });
  },
  setupController: function(controller, model) {
    controller.set('books', model.books);
    controller.set('genres', model.genres);
  }
});

// Need to define a controller because it was probably using an object controller so we just need to be more specific
App.IndexController = Ember.Controller.extend({

});

App.BooksController = Ember.ArrayController.extend({ // Added a books controller to do sorting
  sortProperties: ['title']
});

App.GenresController = Ember.ArrayController.extend({
  sortProperties: ['name']
});

App.ReviewsNewRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({ // this allows us to specify 2 models
      book: this.store.createRecord('book'),
      genres: this.store.findAll('genre'),
    });
  },
  setupController: function(controller, model) {
    controller.set('model', model.book);
    controller.set('genres', model.genres);
  },
  actions: {
    willTransition: function(transition){
       if(this.currentModel.book.get('isNew')) {
        if(confirm('Are you sure you want to abandon progress?')){
          this.currentModel.book.destroyRecord();
        } else {
          transition.abort();
        }
       }
    }
  }
});

App.ReviewsNewController = Ember.Controller.extend({
  ratings: [5, 4, 3, 2, 1],
  actions: {
    createReview: function() {
      var controller = this;
      this.get('model').save().then(function(){
        controller.transitionToRoute('index');
      });
    }
  }
});

App.ApplicationAdapter = DS.FixtureAdapter.extend({

});

//*
App.BookDetailsComponent = Ember.Component.extend({
  classNameBindings: ['ratingClass'], // Property of ember, accepts an array of class names to bind to
  ratingClass : function() {
    return 'rating-' + this.get('book.rating');
  }.property('book.rating')
});//*/

/* // This is actually the default, so we can exclude
App.BookRoute = Ember.Route.extend({ // For any route, need to provide the model to
  model: function(params){
    return this.store.find('book',params.book_id);
  }
});//*/

/*App.GenreRoute = Ember.Route.extend({ // For any route, need to provide the model to
  model: function(params){
    return this.store.find('book',params.);
  }
});//*/


App.Book = DS.Model.extend({
  title: DS.attr(),
  author: DS.attr(),
  review: DS.attr(),
  rating: DS.attr('number'),
  amazon_id: DS.attr(),
  genre: DS.belongsTo('genre'), // you dont need to have it map both ways
  url: function() {
    return "http://www.amazon.com/gp/product/" + this.get('amazon_id') + "/test";
  }.property('amazon_id'),
  image: function() {
    return "http://placehold.it/150x150/" + this.get('amazon_id');
  }.property('amazon_id')
});

App.Book.FIXTURES = [
  {
    id : 1,
    title: 'red',
    author: 'bud',
    amazon_id: '1234',
    rating: 3,
    review: 'loren ipsum ....',
    genre: 1
  },
  {
    id : 2,
    title: 'blue',
    author: 'bud',
    amazon_id: '1234',
    rating: 4,
    review: 'loren ipsum ....',
    genre: 1
  },
  {
    id : 3,
    title: 'pink',
    author: 'bud',
    amazon_id: '1234',
    rating: 5,
    review: 'loren ipsum ....',
    genre: 2
  }
];

App.Genre = DS.Model.extend({
  name: DS.attr(),
  books: DS.hasMany('book', {async: true})
});

App.Genre.FIXTURES = [
  {
    id: 1,
    name: 'Sci Fi',
    books: [1 ,2]
  },
  {
    id: 2,
    name: 'Comedy',
    books: [3]
  },
  {
    id: 3,
    name: 'Romance',
    books: []
  }
];