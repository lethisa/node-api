var mongoose = require('mongoose');

// scheme
var Todo = mongoose.model('todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator:{
    type:mongoose.Schema.Types.ObjectId,
    required :true
  }
});

// exports
module.exports = {
  Todo
};

// instance
/*var newTodo = new Todo({
  text: 'cook dinner'
});

// save
newTodo.save().then((doc) => {
  console.log('save todo', doc);
}, (e) => {
  console.log('unable to save todo', e);
});*/


/*var otherTodo = new Todo({
  text: 'feed the cat',
  completed: true,
  completedAt: 123
});

otherTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('unable to save todo', e);
});*/
