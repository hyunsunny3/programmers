const express = require('express')
const app = express()

// 서버 셋팅 : 포트넘버 세팅
app.listen(1234)

// GET + "/"
app.get('/', function (req, res) {
  res.send('Hello World')
})

// API : GET + "http://localhost:1234/test"
// "TEST SUCCESS"
app.get('/test', function (req, res) {
  res.send('TEST SUCCESS')
})

// API : GET + "http://localhost:1234/test/1"
// "One!!"
app.get('/test/1', function (req, res) {
  res.send('One!!')
})

// GET 메소드로 '/' 이 날아오면 매개변수로 전달받은 콜백 함수를 호출하겠어
// => 서버에 셋팅


/* ** JSON ** */
// GET /hello 
app.get('/hello', function (req, res) {
  res.send({
    say : "hello!!"
  })
})

// GET /bye
app.get('/bye', function (req, res) {
  res.json({
    say : "bye!!"
  })
})

// products
let nodejsBook = {
	title : "Node.js를 공부해보자.",
	price : 200000,
	description : "이 책 왜 좋음?? 윤현선이 지음"
}

app.get('/products/1', function (req, res) {
  res.json(nodejsBook)
})