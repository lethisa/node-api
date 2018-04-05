const {
  ObjectID
} = require('mongodb');

const {
  mongoose
} = require('./../server/db/mongoose');
const {
  Todo
} = require('./../server/models/todo');

const {
  User
} = require('./../server/models/user');

/*Todo.remove({}).then((result) => {
  console.log(result);
});*/

// Todo.findOneAndRemove
/*Todo.findOneAndRemove({
  _id: '5ac5a54ec17dc189ccc75cc8'
}).then((todo) => {
  console.log(todo);
});*/


/*Todo.findByIdAndRemove('5ac5a4acc17dc189ccc75c81').then((todo) => {
console.log(todo);
});*/
