const restful = require('node-restful')
const mongoose = restful.mongoose

const eventoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  dataInicio: { type: String, required: true },
  dataFim: { type: String, required: true },
  tipo: { type: Number, required: true },
  endereco: { type: String, required: true },
  quantidadePessoas: { type: Number, required: true },
  quantidadeProfissionais: { type: Number, required: true },
  idCriador: { type: Number, required: true },
  status: { type: Number, required: true }
}, {timestamp: true})

module.exports = restful.model('Evento', eventoSchema)
