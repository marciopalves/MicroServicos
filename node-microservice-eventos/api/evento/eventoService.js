var request = require('request-promise');
const Evento = require('./evento')
const url_api_externa = "http://localhost:8080/usuarios/"

Evento.methods(['get', 'post', 'put', 'delete'])
Evento.updateOptions({ new: true, runValidators: true })

Evento.after('get', function (req, res, next) {
  var eventos = res.locals.bundle

  request({
    "method": "GET",
    "uri": url_api_externa,
    "json": true,
    "headers": {
      "User-Agent": "My little demo app"
    }
  }).then(function (body) {
    console.log("Dados oriundos do microserviço:" + body)
    res.json({ eventos, criadores: body })
  }
    , function (err) {
      console.error("Falha ao trazer dados do microserviço:" + err);
      next()
    });
});


module.exports = Evento