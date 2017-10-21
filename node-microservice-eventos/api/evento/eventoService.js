var request = require('request-promise');
const Evento = require('./evento')
const url_api_externa = "http://localhost:8080/usuarios/"

Evento.methods(['get', 'post', 'put', 'delete'])
Evento.updateOptions({ new: true, runValidators: true })

Evento.after('get', function (req, res, next) {
  var eventos = res.locals.bundle

  consultaExterna(url_api_externa).then(function (body) {
    console.log("Dados oriundos do microserviço:" + body)
    res.json({ eventos, criadores: body })
  }
    , function (err) {
      console.error("Falha ao trazer dados do microserviço:" + err);
      next()
    });
});

Evento.before('post', function (req, res, next) { hasUsuario(req, res, next); });
Evento.before('put', function (req, res, next) { hasUsuario(req, res, next); });

function hasUsuario(req, res, next) {
  var url = url_api_externa + req.body.idCriador

  //Só prossegue com a requisição/ação se o idCriador for equivalente a um usuário existente na API externa
  consultaExterna(url).then(function (body) {
    next();
  }, function (err) {
    var erroAPIExterna = err.error;
    console.error("Erro da API externa:" + erroAPIExterna.mensagemDesenvolvedor);
    res.status(erroAPIExterna.status).json({ erro: erroAPIExterna.titulo });
  });
}

function consultaExterna(url) {
  return request({
    'method': 'GET',
    'uri': url,
    'json': true,
    'headers': {
      'User-Agent': 'MicroserviceNodeJS'
    }
  });
}

module.exports = Evento