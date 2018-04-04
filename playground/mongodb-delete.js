// load mongoDB
const {
  MongoClient
} = require('mongoDB');

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if (err) {
    return console.log('unable connect to mongoDB server');
  }
  console.log('connected to mongoDB server');

  // deleteMany
  /*  db.collection('todo').deleteMany({
      text: 'lunch'
    }).then((result) => {
      console.log(result);
    });*/

  // deleteOne
  /*db.collection('todo').deleteOne({
    text: 'lunch'
  }).then((result) => {
    console.log(result);
  });*/

  // findAndDelete
  db.collection('todo').findOneAndDelete({
    completed: false
  }).then((result) => {
    console.log(result);
  });

  db.close();
});
