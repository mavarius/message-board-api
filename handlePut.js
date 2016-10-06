const fs = require('fs')
const anyBody = require('body/any')

const filename = 'messages.json'

function updateMessage (body, path) {
  fs.readFile(filename, (err, buffer) => {
    if (err) throw err
    let messages = JSON.parse(JSON.parse(buffer))

    messages = messages.map(obj => {
      if (obj.id === path) {
        obj.message = body.message
        return obj
      } else {
        return obj
      }
    })

    messages = JSON.stringify(JSON.stringify(messages))
    fs.writeFile(filename, messages, err => {
      if (err) throw err
    })
  })
}

module.exports = (req, path, res) => {
  anyBody(req, res, (err, body) => {
    if (err) throw err
    if (!path) {
      res.end('must specify id of message to replace')
    } else {
      updateMessage(body, path)
      res.end('new message updated')
    }
  })
}
