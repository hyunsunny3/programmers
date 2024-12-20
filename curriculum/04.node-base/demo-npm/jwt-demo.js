var jwt = require('jsonwebtoken');
var dotenv = require('dotenv')

dotenv.config();

var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);
// sign with RSA SHA256
console.log(token);

// 검증 - 검증에 성공하면 페이로드 값 확인 가능
var decoded = jwt.verify(token, process.env.PRIVATE_KEY)
console.log(decoded);
