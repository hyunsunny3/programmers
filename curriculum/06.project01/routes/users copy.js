const express = require("express")
const router = express.Router()
const conn = require('../mariadb')

// A simple SELECT query
// conn.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     var {id, email, name, created_at} = results[0]
//     console.log(id);
//     console.log(email);
//     console.log(name);
//     console.log(created_at);
//   }
// );

router.use(express.json()) // http 외 모듈 'json'

let db = new Map()
var id = 1

// 회원가입
router.post('/join',(req, res) => {
  // if(req.body.length){
  // if(req.body.size){
  if(req.body == {}){
    res.status(400).json({
      message : `입력값을 다시 확인해주세요.`
    })
    
  }else{
    const {email, name, password, contact} = req.body

    conn.query(
      `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`, [email, name, password, contact],
      function (err, results, fields) {
        res.status(201).json(results)
        // if(results.length){
        // } else{
        //   res.status(404).json({
        //     message : "정보가 없습니다"
        //   })
        // }
      }
    );
  }
})

// 로그인
router.post('/login',(req, res) => {
  //email이 db에 존재하는지 확인
  const {email, password} = req.body 
  

  conn.query(
    `SELECT * FROM users WHERE email = ?`, email,
    function (err, results, fields) {
      var loginUser = results[0];
      if(loginUser && loginUser.password == password){
        res.status(200).json({
          message : `${loginUser.name}님 하이~`
        })
      }else{
        res.status(400).json({
          message : `이메일 또는 비밀번호가 틀렸습니다.`
        })
      }
    }
  );

  // db.forEach((user, id) => {
  //   if(user.userId === userId){
  //     loginUser = user
  //   }
  // })

  // if(isExist(loginUser)){
  //   console.log("찾았당");
  //   if(loginUser.password === password){
  //     console.log("비번 정답");
  //     res.status(200).json({
  //       message : `${loginUser.name}님 하이~`
  //     })
  //   }else{
  //     console.log("비번 탈락");
  //     res.status(404).json({
  //       message : `비번 탈락.`
  //     })
  //   }
  // }else{
  //   console.log("아이디 없당");
  //   res.status(400).json({
  //     message : `회원정보가 없습니다.`
  //   })
  // }
})

// function isExist(obj){
//   if(Object.keys(obj).length){
//     return true;
//   }else{
//     return false;
//   }
// }

// route
router
  .route('/users')
  .get((req, res) => { // 회원 개별 조회
    let {email} = req.body
  
    conn.query(
      `SELECT * FROM users WHERE email = ?`, email,
      function (err, results, fields) {
        if(results.length){
          res.status(200).json(results)
        } else{
          res.status(404).json({
            message : "정보가 없습니다"
          })
        }
      }
    );
  })
  .delete((req, res) => { // 회원 개별 탈퇴
    let {email} = req.body
    conn.query(
      `DELETE FROM users WHERE email = ?`, email,
      function (err, results, fields) {
        res.status(200).json({
          message : `빠이빠이~`
        })
        // if(user){
        //   db.delete(id)
    
        //   res.status(200).json({
        //     message : `${user.name}님 빠이빠이~`
        //   })
        // } else{
        //   res.status(404).json({
        //     message : "정보가 없습니다"
        //   })
        // }
      }
    );
  
    
  })

module.exports = router