const fs = require('fs')
const uuid = require('uuid')
const moment = require('moment')
const anyBody = require('body/any')

const filename = 'messages.json'

function writeMessage (body) {
  fs.readFile(filename, (err, buffer) => {
    if (err) throw err
    let messages = JSON.parse(JSON.parse(buffer))
    body.id = uuid()
    body.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
    // console.log('body: ', body)
    messages.push(body)
    messages = JSON.stringify(JSON.stringify(messages))

    fs.writeFile(filename, messages, err => {
      if (err) throw err
    })
  })
}

module.exports = (req, res) => {
  anyBody(req, res, (err, body) => {
    if (err) throw err
    writeMessage(body)
    res.end('new message posted')
  })
}
