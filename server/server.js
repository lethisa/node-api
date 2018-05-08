//////////////////////////////////////////////////////// INIT
require('./config/config.js');

var {
  mongoose
} = require('./db/mongoose');

var {
  Todo
} = require('./models/todo');

var {
  User
} = require('./models/user');

var {
  ObjectID
} = require('mongodb');

var {
  authenticate
} = require('./middleware/authenticate');

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const _ = require('lodash');

var app = express();
app.listen(port, () => {
  console.log(`started on port ${port}`);
});



//////////////////////////////////////////////////////// POST TODOS

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {

  console.log(req.body);

  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//////////////////////////////////////////////////////// POST USER

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then((user) => {
    return user.generateAuthToken();
    // res.send(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//////////////////////////////////////////////////////// GET USER

app.get('/users/me', authenticate, (req, res) => {
  // var token = req.header('x-auth');
  //
  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     return Promise.reject();
  //   }
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send(e);
  // });
  res.send(req.user);
});

//////////////////////////////////////////////////////// GET

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//////////////////////////////////////////////////////// GET / ID

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  // res.send(req.params);

  // validation id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // findById
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({
      todo
    });
  }).catch((e) => {
    res.status(400).send();
    console.log(e);
  });

});

//////////////////////////////////////////////////////// DELETE

app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({
      todo
    });

  }).catch((e) => {
    res.status(400).send();
    console.log(e);
  });

});

//////////////////////////////////////////////////////// UPDATE

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({
      todo
    });
  }).catch((e) => {
    res.status(400).send();
    console.log(e);
  });

});

//////////////////////////////////////////////////////// LOGIN

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    // res.send(user);
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//////////////////////////////////////////////////////// LOGOUT

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

//////////////////////////////////////////////////////// EXPORT

module.exports = {
  app
};
