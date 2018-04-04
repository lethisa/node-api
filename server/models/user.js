var mongoose = require('mongoose');

// scheme
var User = mongoose.model('user', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

/*var user = new User({
  email: 'lethisa@gmail.com'
});

user.save().then((doc) => {
  console.log('user saved', doc);
}, (e) => {
  console.log('unable to save', e);
});*/

// exports
module.exports = {
  User
};
