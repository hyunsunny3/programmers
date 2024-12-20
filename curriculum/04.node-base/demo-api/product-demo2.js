// 예외처리 고도화

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

let db = new Map()
var id = 1

db.set(id++, product1);
db.set(id++, product2);
db.set(id++, product3);


// REST API 설계

// 0. 전체 상품 조회
app.get('/products', (req,res) => {
  let products = {}

  if(db.size !== 0){
    db.forEach((value, key) => {
      products[key] = value
    })
  
    res.json(products)
  }else{
    res.status(404).send("상품 없음")
  }
})

// 1. 개별 상품 조회
app.get('/products/:id',function(req,res){
  let {id} = req.params
  id = parseInt(id)
  
  let products = db.get(id)

  if( products == undefined || products == "undefined" ){
    res.status(404).json({
      message : "찾을 수 없습니다."
    })
  }else{
    res.json(products)
  }
})

// 2. 상품 등록
app.use(express.json())
app.post('/products',(req, res) => {
  const productName = req.body.productName
  if(productName){
    db.status(201).set(id++, req.body)
  
    res.json({
      message : `${db.get(id - 1).productName}의 등록이 완료되었습니다!`
    })
  }else{
    res.status(400).send("요청 값을 제대로 보내주세요.")
  }

})

// 3. 상품 삭제
app.delete('/products/:id',(req, res) => {
  let {id} = req.params
  id = parseInt(id)

  let prd = db.get(id)
  if(prd == undefined){
    res.status(404).json({
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
  if(db.size >= 1){
    db.clear()

    res.json({
      message : "전체 삭제 완료"
    })
  }else{
    res.status(404).json({
      message : "삭제할 데이터가 없습니다"
    })
  }
})

// 5. 개별 상품 수정
app.put('/products/:id',(req, res) => {
  let {id} = req.params
  id = parseInt(id)
  let prd = db.get(id);

  if(prd){
    let odlName = prd.productName;
    let newName = req.body.productName;
    prd.productName = newName;
    db.set(id, prd)
    res.json({
      message : `${odlName}상품이 ${newName}으로 변경되었습니다.`
    })
  }else{
    res.status(404).json({
      message : `요청하신 ${id}상품은 없는 상품입니다.`
    })
  }
})