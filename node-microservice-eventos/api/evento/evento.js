const restful = require('node-restful')
const mongoose = restful.mongoose

const eventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  dataInicio: { type: String, required: true },
  dataFim: { type: String, required: true },
  tipo: { type: String, required: true },
  endereco: { type: String, required: true },
  quantidadePessoas: { type: String, required: true },
  quantidadeProfissionais: { type: String, required: true },
  idCriador: { type: String, required: true },
  status: { type: String, required: true }
}, {timestamp: true})

module.exports = restful.model('Evento', eventoSchema)
