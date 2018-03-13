// server.js
const path = require('path');
console.log(__dirname)
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(__dirname + path.sep + 'db.json')
const middlewares = jsonServer.defaults()
const getPort = require('get-port')

var port, defaultPort = 3001;

getPort({port: defaultPort}).then(port => {
  console.log(port);
  server.use(middlewares)
  server.use(router)
  server.listen(port, () => {
    console.log('JSON Server is running on port', port)
    if(port !== defaultPort) {
      console.warn('Set the given port URL parameter in App.js')
    }
  })
});
