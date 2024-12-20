const express = require("express");
const router = express.Router();
const conn = require('../mariadb');
const {body, param, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

const validate = (req, res, next) => { //미들웨어 / 모듈화
  const err = validationResult(req);

  if(err.isEmpty()){
    return next(); // 다음 미들웨어 실행
  }else{
    return res.status(400).json(err.array());
  }
}

router.post( // 회원가입
  '/join',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 형식 맞춰주세요'),
    body('name').notEmpty().isString().withMessage('이름 확인 필요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    body('contact').notEmpty().isString().withMessage('전화번호 확인 필요'),
    validate
  ],
  (req, res) => {
    const {email, name, password, contact} = req.body

    let sql =`INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`
    let values = [email, name, password, contact]
    conn.query(sql, values,
      function (err, results) {
        if(err){
          console.log(err);
          return res.status(400).end()
        }
        res.status(201).json(results)
      }
    );
})

router.post( // 로그인
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('이메일 형식 맞춰주세요'),
    body('password').notEmpty().isString().withMessage('비밀번호 확인 필요'),
    validate
  ],
  (req, res) => {
    const {email, password} = req.body ;

    let sql =`SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email,
      function (err, results) {
        if(err){
          console.log(err);
          return res.status(400).end();
        }

        var loginUser = results[0];

        if(loginUser && loginUser.password == password){
          const token = jwt.sign({
            email : loginUser.email,
            name : loginUser.name
          }, process.env.PRIVATE_KEY,{
            expiresIn : "5m",
            issuer : "hyunsunny"
          });

          res.cookie("token", token, {httpOnly : true})
          console.log(token);
          

          res.status(200).json({
            message : `${loginUser.name}님 하이~`
          });
        }else{
          res.status(403).json({
            message : `이메일 또는 비밀번호가 틀렸습니다.`
          });
        }
      }
    )
})

router
  .route('/users')
  .get( // 회원 개별 조회
    [
      body('email').notEmpty().isEmail().withMessage('이메일 형식 맞춰주세요'),
      validate
    ],
    (req, res) => { 
      let {email} = req.body
    
      let sql = `SELECT * FROM users WHERE email = ?`
      conn.query(sql, email,
        function (err, results) {
          if(err){
            console.log(err);
            return res.status(400).end()
          }
          res.status(200).json(results)
        }
      )
  })
  .delete( // 회원탈퇴
    [
      body('email').notEmpty().isEmail().withMessage('이메일 형식 맞춰주세요'),
      validate
    ],
    (req, res) => { 
      let {email} = req.body

      let sql = `DELETE FROM users WHERE email = ?`
      conn.query(sql, email,
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