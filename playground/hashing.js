///////////////
// crypto-js //
///////////////


/*const {
  SHA256
} = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
  id: 4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();


if (resultHash === token.hash) {
  console.log('data was not changed');
} else {
  console.log('data was changed !!!');
}
*/

//////////////////
// jsonwebtoken //
//////////////////

/*const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decode = jwt.verify(token, '123abc');
console.log(decode);*/

//////////////
// bcryptjs //
//////////////

const bcrypt = require('bcryptjs');

var password = '123abc';

/*bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});*/

var hashedPassword = '$2a$10$v4puNaoVHoMlyVGcW28.iO7gFY51GRikHrQPZFdaR4FGXDD755URe';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
