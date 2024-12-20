// 예외처리

const express = require('express')
const app = express()
app.listen(1234)

const fruits = [
  { id : 1, name : "apple"},
  { id : 2, name : "orange"},
  { id : 3, name : "strawberry"},
  { id : 4, name : "blueberry"},
]

app.get('/fruits', (req,res) => {
  // res.json(fruits) // json array
})

app.get('/fruits/:id', (req, res) => {
  let id = req.params.id
  // let fruit = fruits[id - 1]

  var findFruit = 
      fruits.find(f => (f.id == id))
                // fruits 배열 안에 있는 객체 중, id값이 params.id와 같은 객체

  // var findFruit = ""
  // fruits.forEach((fruit) => {
  //   if (fruit.id == id){
  //     findFruit = fruit
  //   }
  // })

  if(findFruit){
    res.json(findFruit)
  }else{ //예외를 터트린다 = http status code 성공이 아닌 실패로
    res.status(404).send("전달한 id에 저장된 과일이 없음")
  }

  
})


