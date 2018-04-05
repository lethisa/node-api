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

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const _ = require('lodash');

var app = express();
app.listen(port, () => {
  console.log(`started on port ${port}`);
});



//////////////////////////////////////////////////////// POST

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  console.log(req.body);

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//////////////////////////////////////////////////////// GET

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

//////////////////////////////////////////////////////// GET / ID

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  // res.send(req.params);

  // validation id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
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

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
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

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, {
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

//////////////////////////////////////////////////////// export
module.exports = {
  app
};
