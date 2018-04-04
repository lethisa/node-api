// load mongoDB
const {
  MongoClient,

} = require('mongoDB');

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if (err) {
    return console.log('unable connect to mongoDB server');
  }
  console.log('connected to mongoDB server');

  // fetch
  /*db.collection('todo').find({
    _id: new ObjectID('5ac31f264b1f02ee44b9c997')
  }).toArray().then((docs) => {
    console.log('todo');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('unable fetch document', err);
  });*/

  // count
  db.collection('todo').find().count().then((count) => {
    console.log(`todo count: ${count}`);
  }, (err) => {
    console.log('unable to fetch data', err);
  });

  db.close();
});
