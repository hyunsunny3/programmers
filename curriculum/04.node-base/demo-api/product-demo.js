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
//    > req : body <= productName, price = 0, description = 0 신규 상품 정보 전달
//    > res : "productName의 등록이 완료되었습니다!"
// 3. 상품 삭제 : DELETE/products/:id
//    > req : params.id
//    > res : "productName상품이 삭제되었습니다."
// 4. 전체 상품 삭제 : DELETE/products
//    > req : X
//    > res : "전체 삭제 완료"
//      db에 값이 1개 이상이면 전체 삭제
//      db에 값이 없으면 "삭제할 데이터가 없습니다"
// 5. 개별 상품 수정 : PUT/products/:id
//    > req : params.id, body <= productName
//    > res : "productName"상품이 새로운"productName"으로 변경되었습니다.

// 0. 전체 상품 조회
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

// 1. 개별 상품 조회
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

// 2. 상품 등록
app.use(express.json()) // http 외 모듈인 '미들웨어' json 설정
app.post('/products',(req, res) => {
  console.log(req.body)
  // 등록 : Map(db)에 저장(put)
  db.set(id++, req.body)

  res.json({
    message : `${db.get(id - 1).productName}의 등록이 완료되었습니다!`
  })
})

// 3. 상품 삭제
app.delete('/products/:id',(req, res) => {
  let {id} = req.params
  id = parseInt(id)

  let prd = db.get(id)
  if(prd == undefined){
    res.json({
      message : `요청하신 ${id}상품은 없는 상품입니다.`
    })
  }else{
    const productName = prd.productName
    db.delete(id)
  
    res.json({
      message : `${productName}상품이 삭제되었습니다.`
    })
  }
})

// 4. 전체 상품 삭제
app.delete('/products',(req, res) => {
  let msg = ""
  
  if(db.size >= 1){
    db.clear()
    msg = "전체 삭제 완료"
  }else{
    msg = "삭제할 데이터가 없습니다"
  }

  res.json({
    message : msg
  })
})

// 5. 개별 상품 수정
app.put('/products/:id',(req, res) => {
  let {id} = req.params
  id = parseInt(id)

  let prd = db.get(id);
  let odlName = prd.productName;
  if(prd){
    res.json({
      message : `요청하신 ${id}상품은 없는 상품입니다.`
    })
  }else{
    let newName = req.body.productName;
    prd.productName = newName;
    db.set(id, prd)
    res.json({
      message : `${odlName}상품이 ${newName}으로 변경되었습니다.`
    })
  }
})