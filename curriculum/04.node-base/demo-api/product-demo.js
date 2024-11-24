// express 모듈 세팅
const express = require("express")
const app = express()
app.listen(1234)


// 데이터 세팅
let product1 = {
  productName : "product1",
  price : "10,000",
  description : "첫번째 상품"
}

let product2 = {
  productName : "product2",
  price : "200,000",
  description : "2번째 상품"
}

let product3 = {
  productName : "product3",
  price : "3,000,000",
  description : "3번째 상품"
}

let db = new Map() // key - value = json형태와 같음
var id = 1

db.set(id++, product1);
db.set(id++, product2);
db.set(id++, product3);

// console.log(db.get(1));
// console.log(db.get(2));
// console.log(db.get(3));


// REST API 설계 (URL, method)
// 0. 전체 상품 조회 : GET/products
//    req : X
//    res : map을 전체 조회
// 1. 개별 상품 조회 : GET/products/:id : id로 map에서 객체를 찾아서, 그 객체의 정보를 전달
//    > req : params.id <= map에 저장된 key 값을 전달
//    > res : map에서 id로 객체를 조회 후 전달
// 2. 상품 등록 : POST/products
//    > req : body <= productNamele, price = 0, description = 0 신규 상품 정보 전달
//    > res : "productName의 등록이 완료되었습니다!"

app.get('/products', (req,res) => {
  let products = {}
  db.forEach((value, key) => {
    products[key] = value
  })

  // db.forEach((products) => {
  //   products[products.productName] = value
  // })

  // res.json(JSON.stringify(products))
  res.json(products)
})

app.get('/products/:id',function(req,res){
  let {id} = req.params
  id = parseInt(id)
  // console.log(id);
  
  let products = db.get(id)

  if( products == undefined || products == "undefined" ){
    res.json({
      message : "찾을 수 없습니다."
    })
  }else{
    res.json(products)
  }
})

app.use(express.json()) // http 외 모듈인 '미들웨어' json 설정
app.post('/products',(req, res) => {
  console.log(req.body)
  // 등록 : Map(db)에 저장(put)
  db.set(id++, req.body)

  res.json({
    message : `${db.get(id - 1).productName}의 등록이 완료되었습니다!`
  })
})




// 채널 주소 : https://www.youtube.com/@15ya_egg
// 채널 주소 : https://www.youtube.com/@ChimChakMan_Official
// 채널 주소 : https://www.youtube.com/@TEO_universe