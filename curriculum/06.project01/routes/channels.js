const express = require("express")
const router = express.Router()
const conn = require('../mariadb')
const {body, param, validationResult} = require('express-validator')

router.use(express.json())

const validate = (req, res, next) => { //미들웨어 / 모듈화
  const err = validationResult(req)

  if(err.isEmpty()){
    return next(); // 다음 미들웨어 실행
  }else{
    return res.status(400).json(err.array())
  }
}

router
  .route('/')
  .get( // 채널 전체 조회
    [
      body('userId').notEmpty().isInt().withMessage('userId에 숫자를 입력해주세요'),
      validate
    ],
    (req, res, next) => {
      var {userId} = req.body

      let sql = `SELECT * FROM channels WHERE user_Id = ?`
      conn.query(sql, userId,
        function (err, results) {
          if(err){
            return res.status(400).end()
          }
          if(results.length){
            res.status(200).json(results)
          }else{
            return res.status(400).end()
          }
        }
      )
  })
  .post( // 채널 개별 생성 = db저장
    [
      body('userId').notEmpty().isInt().withMessage('userId에 숫자를 입력해주세요'),
      body('name').notEmpty().isString().withMessage('문자로 입력해주세요'),
      validate
    ],
    (req, res, next) => {
    const {name, userId} = req.body
    let sql =`INSERT INTO channels (name, user_id) VALUES (?,?)`
    let values = [name, userId]
    conn.query(sql, values,
      function (err, results) {
        if(err){
          console.log(err);
          
          return res.status(400).send('error')
        }
        res.status(201).json(results)
      }
    )
    
  })

router
  .route('/:id')
  .get( // 채널 개별 조회
    [
      param('id').notEmpty().withMessage('채널id 필요'),
      validate
    ],
    (req, res, next) => {
      let {id} = req.params
      id = parseInt(id)

      let sql = `SELECT * FROM channels WHERE id = ?`
      conn.query(sql, id,
        function (err, results) {
          if(err){
            console.log(err);
            return res.status(400).send('error')
          }

          if(results.length){
            res.status(200).json(results)
          } else{
            return res.status(400).end()
          }
        }
      )
  })
  .put( // 채널 개별 수정
    [
      param('id').notEmpty().withMessage('채널id 필요'),
      body('name').notEmpty().isString().withMessage('채널이름 오류'),
      validate
    ]
    ,(req, res, next) => {
      let {id} = req.params
      id = parseInt(id)
      let {name} = req.body

      let sql = `UPDATE channels SET name=? WHERE id=?`
      let values = [name, id]
      conn.query(sql, values,
        function (err, results) {
          if(err){
            console.log(err);
            return res.status(400).end()
          }

          if(results.affectedRows == 0){
            return res.status(400).end()
          }else{
            res.status(200).json(results)
          }
        }
      )
  })
  .delete( // 채널 개별 삭제
    [
      param('id').notEmpty().withMessage('채널id 필요'),
      validate
    ],
    (req, res, next) => {
      let {id} = req.params
      id = parseInt(id)

      let sql = `DELETE FROM channels WHERE id=?`
      conn.query(sql, id,
        function (err, results) {
          if(err){
            console.log(err);
            return res.status(400).end()
          }

          if(results.affectedRows == 0){
            return res.status(400).end()
          }else{
            res.status(200).json(results)
          }
        }
      )
  })


module.exports = router