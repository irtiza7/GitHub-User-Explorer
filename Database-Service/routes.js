const Express = require('express')
require('dotenv').config()

const Router = Express.Router()

Router.get(`${process.env.DB_BASE_URL}/get/user-details`)
Router.post(`${process.env.DB_BASE_URL}/save/user-details`)
Router.post(`${process.env.DB_BASE_URL}/save/user-repos`)

module.exports = Router
