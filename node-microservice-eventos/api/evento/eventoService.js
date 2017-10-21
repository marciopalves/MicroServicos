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
      "User-Agent": "MicroserviceNodeJS"
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

Evento.before('post', function (req, res, next) {
  var url = url_api_externa + req.body.idCriador

  request({
    "method": "GET",
    "uri": url,
    "json": true,
    "headers": {
      "User-Agent": "MicroserviceNodeJS"
    }
  }).then(function (body) {
    //Só prossegue com o cadastro se o idCriador for equivalente a um usuário na API externa
    next() 
  }
    , function (err) {
      var erroAPIExterna = err.error
      console.error("Erro da API externa:" + erroAPIExterna.mensagemDesenvolvedor);
      res.status(erroAPIExterna.status).json({ erro: erroAPIExterna.titulo })
    });
});


module.exports = Evento