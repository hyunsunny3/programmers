const express = require("express")
const router = express.Router()
const conn = require('../mariadb')

router.use(express.json())

let db = new Map()
var id = 1

router
  .route('/')
  .get((req,res) => { // 채널 전체 조회
    let {email} = res.body
    let sql = `SELECT * FROM channels WHERE email = ?`

    var {userId} = req.body
    var channels = []

    conn.query(sql, email,
      function (err, results) {
        if(results.length){
          res.status(200).json(results)
        } else{
          res.status(404).json({
            message : "정보가 없습니다"
          })
        }
      }
    );
    if(db.size && userId){ // body에 userId가 없으면
      db.forEach((value, key) => {
        if(value.userId === userId){
          channels.push(value)
        }
      })

      if(channels.length){
        res.status(200).json(channels)
      }else{
        notFoundChannel()
      }

    }else{
      notFoundChannel()
    }
  })
  .post((req,res) => { // 채널 개별 생성 = db저장
    if(req.body.channelTitle){
      let channel = req.body
      db.set(id++, channel)
  
      res.status(201).send(`${db.get(id - 1).channelTitle}채널 생성!`)
    }else{
      res.status(400).send("요청 값을 제대로 보내주세요")
    }
  })


router
  .route('/:id')
  .get((req,res) => { // 채널 개별 조회
    let {id} = req.params
    id = parseInt(id)

    let sql = `SELECT * FROM channels WHERE id = ?`
    conn.query(sql, id,
      function (err, results) {
        if(results.length){
          res.status(200).json(results)
        } else{
          notFoundChannel()
        }
      }
    );
    if(channel){
      res.status(200).json(channel)
    }else{
      notFoundChannel()
    }
  })
  .put((req,res) => { // 채널 개별 수정
    let {id} = req.params
    id = parseInt(id)

    var channel = db.get(id)
    var oldTitle = channel.channelTitle
    if(channel){
      var newTitle = req.body.channelTitle

      channel.channelTitle = newTitle
      db.set(id, channel)

      res.json({
        message : `${oldTitle}에서 ${newTitle}로 수정 완료`
      })
    }else{
      notFoundChannel()
    }
  })
  .delete((req,res) => { // 채널 개별 삭제
    let {id} = req.params
    id = parseInt(id)

    var channel = db.get(id)
    if(channel){
      db.delete
      res.status(200).json({
        message : `${channel.channelTitle}이 정상적으로 삭제되었습니다.`
      })
    }else{
      notFoundChannel()
    }
  })

function notFoundChannel(){
  res.status(404).json({
    message : "채널 정보를 찾을 수 없습니다."
  })
}

module.exports = router