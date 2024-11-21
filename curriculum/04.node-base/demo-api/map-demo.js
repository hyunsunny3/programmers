const express = require('express')
const app = express()
app.listen(1234)

app.get('/:id', function (req, res) {
  let {id} = req.params
  id = parseInt(id)

  if (db.get(id) == undefined || db.get(id) == "undefined"){
    res.json({
      message : "없는 상품"
    })
  }else{
    product = db.get(id)
    // product.id = id
    product["id"] = id

    res.json(product)
  }
})

// app.get('/:id', function (req, res) {
//   let {id} = req.params
// 	// console.log(id);
//   id = parseInt(id)
// 	// console.log(db.get(id));

//   if (db.get(id) == undefined || db.get(id) == "undefined"){
//     res.json({
//       message : "없는 상품"
//     })
//   }else{
//     res.json({
//       id : id,
//       productName : db.get(id)
//     })
//   }
// })

// localhost:1234/1 => NoteBook
// localhost:1234/2 => Cup
// localhost:1234/3 => Chair

let db = new Map()

let notebook = {
  productName : "Notebook",
  price : 2000000
}
let cup = {
  productName : "Cup",
  price : 3000
}
let chair = {
  productName : "Chair",
  price : 100000
}
let poster = {
  productName : "Poster",
  price : 20000
}

db.set(1, notebook) // 키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(2, cup)
db.set(3, chair)
db.set(4, poster)

console.log(db);
console.log(db.get(1));
console.log(db.get(2));
console.log(db.get(3));
console.log(db.get(4));
