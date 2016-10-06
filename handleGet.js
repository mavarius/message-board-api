const fs = require('fs')

const filename = 'messages.json'

module.exports = (path, res) => {
  fs.readFile(filename, (err, buffer) => {
    if (err) throw err

    let messages = JSON.parse(JSON.parse(buffer))

    if (!path) {
      messages.forEach(obj => {
        res.write(`${obj.timestamp}: ${obj.message}\n`)
      })
    } else {
      let msID = messages
      msID.filter(obj => (obj.id === path))
      res.write(`${msID[0].timestamp}: ${msID[0].message}\n`)
    }

    res.end('end of messages')
  })
}
