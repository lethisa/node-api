// load mongoDB
// const MongoCLient = require('mongodb').MongoClient;
// destructur
const {MongoClient, ObjectID} = require('mongoDB');

var obj = new ObjectID();
console.log(obj);

// destructur
/*var user = {
  name: 'lethisa',
  age: 23
};

var {name} = user;
console.log(name);*/

MongoClient.connect('mongodb://localhost:27017/todoApp', (err, db) => {
  if (err) {
    return console.log('unable connect to mongoDB server');
  }
  console.log('connected to mongoDB server');

  // add data
  // db.collection('Todos').insertOne({
  //   text: 'text',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  /*db.collection('user').insertOne({
    name: 'lethisa',
    age:25,
    location:'USA'
  },(err,result)=>{
    if (err) {
      return console.log('unable to insert users', err);
    }
    // console.log(result.ops);
    console.log(result.ops[0]._id.getTimestamp());
  });
*/
  db.close();
});
