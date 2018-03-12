// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const getPort = require('get-port')

var port;


getPort({port: 3000}).then(port => {
  console.log(port);
  server.use(middlewares)
  server.use(router)
  server.listen(port, () => {
    console.log('JSON Server is running on port', port)
    if(port !== 3000) {
      console.warn('Set the given port URL parameter in App.js')
    }
  })
});
