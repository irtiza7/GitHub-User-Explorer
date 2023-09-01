const Express = require('express')
const Morgan = require('morgan')
const CORS = require('cors')
const Router = require('../routes')
require('dotenv').config()

const server = Express()
const cors = CORS()
const morgan = Morgan('common')

server.use(cors)
server.use(morgan)
server.use('/', Router)

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(`Database Server is running on port http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
})
