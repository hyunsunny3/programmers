// express 모듈 세팅
const express = require("express")
const app = express()
app.listen(2222)

const userRouter = require('./routes/users')
const channelRouter = require('./routes/channels')

app.use("/", userRouter)
app.use("/channels", channelRouter)