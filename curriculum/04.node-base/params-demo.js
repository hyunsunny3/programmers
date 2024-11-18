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

	res.json({
		num : req.params.n
	})
})