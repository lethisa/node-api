// load mongoDB
const {
  MongoClient,
  ObjectID
} = require('mongoDB');

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if (err) {
    return console.log('unable connect to mongoDB server');
  }
  console.log('connected to mongoDB server');

  // findOneAndUpdate
  /*db.collection('todo').findOneAndUpdate({
    _id: new ObjectID('5ac3292d4b1f02ee44b9cb5f')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });*/

  // other example
  db.collection('user').findOneAndUpdate({
    _id: new ObjectID('5ac324c64b1f02ee44b9ca82')
  }, {
    $set: {
      name: 'ellim'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
