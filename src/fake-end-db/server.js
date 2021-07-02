const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(router)

server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})

server.listen(8080, () => {
    console.log('JSON Server is running')
})
