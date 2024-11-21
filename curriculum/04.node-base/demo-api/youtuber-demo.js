// express 모듈 세팅
const express = require("express")
const app = express()
app.listen(1234)


// 데이터 세팅
let youtuber1 = {
  channelTit : "십오야",
  sub : "593만명",
  videoNum : "993천개"
}

let youtuber2 = {
  channelTit : "침착맨",
  sub : "265만명",
  videoNum : "7.26천개"
}

let youtuber3 = {
  channelTit : "태오",
  sub : "54.8만명",
  videoNum : "726개"
}

let db = new Map() // key - value = json형태와 같음
var id = 1

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// console.log(db.get(1));
// console.log(db.get(2));
// console.log(db.get(3));


// REST API 설계 (URL, method)
// 0. 전체 유튜버 조회 : GET/youtubers
//    req : X
//    res : map을 전체 조회
// 1. 개별 유튜버 조회 : GET/youtubers/:id : id로 map에서 객체를 찾아서, 그 객체의 정보를 전달
//    > req : params.id <= map에 저장된 key 값을 전달
//    > res : map에서 id로 객체를 조회 후 전달
// 2. 유튜버 등록 : POST/youtubers
//    > req : body <= channelTitle, sub = 0, videoNum = 0 신규 유튜버 정보 전달
//    > res : "channelTitle님, 유튜버 생활을 응원합니다!"

app.get('/youtubers', (req,res) => {
  res.json(db)
})

app.get('/youtubers/:id',function(req,res){
  let {id} = req.params
  id = parseInt(id)
  // console.log(id);
  
  let youtubers = db.get(id)

  if( youtubers == undefined || youtubers == "undefined" ){
    res.json({
      message : "찾을 수 없습니다."
    })
  }else{
    res.json(youtubers)
  }
})

app.use(express.json()) // http 외 모듈인 '미들웨어' json 설정
app.post('/youtubers',(req, res) => {
  console.log(req.body)
  // 등록 : Map(db)에 저장(put)
  db.set(id++, req.body)

  res.json({
    message : `${db.get(id - 1).channelTit}님, 유튜버 생활을 응원합니다!`
  })
})




// 채널 주소 : https://www.youtube.com/@15ya_egg
// 채널 주소 : https://www.youtube.com/@ChimChakMan_Official
// 채널 주소 : https://www.youtube.com/@TEO_universe