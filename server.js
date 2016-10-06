const PORT = 8000

const http = require('http')
const qs = require('querystring')

const handleGet = require('./handleGet')
const handlePost = require('./handlePost')
const handleDelete = require('./handleDelete')
const handlePut = require('./handlePut')

const server = http.createServer((req, res) => {
  let { method, url } = req
  console.log(`${method}${url}`)
  let [path, queryStr] = url.split('?')
  let query = qs.parse(queryStr)
  console.log('query: ', query)
  let param = path.split('/')
  console.log(param)

  const handler = {
    GET: (path, res) => handleGet(path, res),
    POST: (req, res) => handlePost(req, res),
    DELETE: (path, res) => handleDelete(path, res),
    PUT: (req, path, res) => handlePut(req, path, res)
  }

  if (param[1] !== 'messages') {
    res.statusCode = 404
    res.end('Invalid Path')
  } else {
    switch (method) {
      case 'GET':
        handler[method](param[2], res)
        break
      case 'POST':
        handler[method](req, res)
        break
      case 'DELETE':
        handler[method](param[2], res)
        break
      case 'PUT':
        handler[method](req, param[2], res)
        break
      default:
        res.statusCode = 404
        res.end('Invalid Method')
    }
  }
})

server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`)
})
