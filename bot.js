const http = require('http')

function start(game) {
    return {
      color: '#FF0000'
    }
  }

  function move(reqData) {
    return {
      move: 'up'
    }
  }

http.createServer((req, res) => {
    if (req.method !== 'POST') return respond()
    let body = []
    let message = {}
    req.on('data', chunk => body.push(chunk))
    req.on('end', () => {
      try{
        if (req.url === '/end') message = ''
        if (req.url === '/ping') message = ''
        body = JSON.parse(Buffer.concat(body).toString())
        if (req.url === '/start') message = start(body)
        if (req.url === '/move') message = move(body)
      } catch(e) {
        console.log(e)
      }
      setTimeout(() => respond(message), 400)
    });

    function respond(message) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(message))
    }
  }).listen(process.env.PORT || 5001, console.error)