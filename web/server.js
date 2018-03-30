const express = require('express')
const router = require('express').Router()
const fetch = require('node-fetch')
const http = require('http')
const port = 3000

const app = express()

const server = http.createServer(app).listen(port, () => {
  console.log('express started on http://localhost:' + port)
})

app.use(router)

const io = require('socket.io')(server)

io.on('connection', function (socket) {
  console.log('in socket')
  // let output = ''
  getIssues().then(result => {
    io.emit('issue', { issue: result })
  })
})

app.use(express.static('public'))

async function getIssues () {
  const response = await fetch(process.env.KEY_GIT_URL, { headers: { 'Authorization': process.env.KEY_GIT } })
  const data = await response.json()
  // console.log(data)
  return data
}
