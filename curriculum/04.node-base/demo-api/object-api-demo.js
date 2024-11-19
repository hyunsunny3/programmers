const express = require('express')
const app = express()

// 서버 셋팅 : 포트넘버 세팅
app.listen(1234)


// 채널 주소 : https://www.youtube.com/@15ya_egg
// 채널 주소 : https://www.youtube.com/@ChimChakMan_Official
// 채널 주소 : https://www.youtube.com/@TEO_universe

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

app.get('/:nickname', function (req, res) {
	const {nickname} = req.params

	if (nickname == "@15ya_egg"){
    res.json(youtuber1)
  }else if (nickname == "@ChimChakMan_Official"){
    res.json(youtuber2)
  }else if (nickname == "@TEO_universe"){
    res.json(youtuber3)
  }else{
    res.json({
      message : "모르는 유튜버"
    })
  }
  // 예외 처리 : 개발자가 예상하지 못한 에러를 처리
})

