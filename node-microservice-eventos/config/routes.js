const express = require('express')

module.exports = function(server) {

  // API Routes
  const router = express.Router()
  server.use('/api', router)

  // rotas da API
  const eventoService = require('../api/evento/eventoService')
  eventoService.register(router, '/eventos')
}