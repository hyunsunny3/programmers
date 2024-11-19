const express = require('express')
const app = express()

// 서버 셋팅 : 포트넘버 세팅
app.listen(1234)

app.get('/products/:n', function (req, res) {
	// : - URL로 매개변수 전달
	// products/__ 빈칸에 오는 값을 n이라는 변수에 담아줘
	// res.params
  // console.log(req.params);
  // console.log(req.params.n);

	let number = parseInt(req.params.n) // 숫자로 변환
	console.log(number);
	
	res.json({
		num : number
	})
})

// 채널 주소 : https://www.youtube.com/@ChimChakMan_Official
// 채널 주소 : https://www.youtube.com/@TEO_universe
// app.get('/:nickname', function (req, res) {

// 	const param = req.params

// 	res.json({
// 		channel : param.nickname
// 	})
// })

// 영상 주소 : https://www.youtube.com/watch?v=PHpqDW9AfEk&t=1445s
// 영상 주소 : https://www.youtube.com/watch?v=PHpqDW9AfEk&t=1615s
// 영상 주소 : https://www.youtube.com/watch?v=39vz2axxyUo
// ? = query

/* ** v=PHpqDW9AfEk&t=1615s ** */
// app.get('/watch', function (req, res) {
// 	const q = req.query
// 	console.log(q); // {v: 'PHpqDW9AfEk', t: '1615s'}
// 	console.log(q.v); // PHpqDW9AfEk
// 	console.log(q.t); // 1615s

// 	res.json(q)
	
// 	// res.json({
// 	// 	video : q.v,
// 	// 	timeline : q.t
// 	// })
// })

app.get('/watch', function (req, res) {

	// JS객체(JSON)의 비구조화
	const {v, t} = req.query
	console.log(v);
	console.log(t);
	
	res.json({
		video : v,
		timeline : t
	})
})