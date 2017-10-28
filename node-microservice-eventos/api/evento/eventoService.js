var request = require('request-promise');
const Evento = require('./evento')
const url_api_externa = "http://localhost:8080/usuarios/"

Evento.methods(['get', 'post', 'put', 'delete'])
Evento.updateOptions({ new: true, runValidators: true })

Evento.after('get', function (req, res, next) {
  var eventos = res.locals.bundle
  var url = url_api_externa
  var path = req.path

  path = path.replace('/eventos', '')
  path = path.replace('/', '')

  if (path != '') {
    url = url + res.locals.bundle.idCriador
  }

  consultaExterna(url).then(function (body) {
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
  }, function (error, res) {

    var erroAPIExterna = {
      mensagemDesenvolvedor: "Microserviço externo indisponível",
      status: 404,
      titulo: "O módulo de usuários não está disponível no momento, tente mais tarde"
    }

    if (res != null) {
      erroAPIExterna = error.error
    }

    console.error("Erro:" + error);
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