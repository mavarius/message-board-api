const fs = require('fs')

const filename = 'messages.json'

module.exports = (path, res) => {
  fs.readFile(filename, (err, buffer) => {
    if (err) throw err

    let messages = JSON.parse(JSON.parse(buffer))

    if (!path) {
      res.end('Must specify messaeg id# or \'all\' to delete')
    } else if (path === 'all') {
      messages = []
      res.end('All messages deleted')
    } else {
      let deletedMessage = messages.filter(obj => (obj.id === path))
      res.write(`DELETED MESSAGE: (${deletedMessage[0].timestamp}): ${deletedMessage[0].message}\n`)
      messages = messages.filter(obj => (obj.id !== path))
    }

    messages = JSON.stringify(JSON.stringify(messages))
    fs.writeFile(filename, messages, err => {
      if (err) throw err
    })
  })
}
