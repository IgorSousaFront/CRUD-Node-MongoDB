const mongoose = require('mongoose');

const Address = new mongoose.Schema({
  cep: String,
  street: String,
  number: Number,
  complement: String
});

// atributo nested contendo CEP, rua, número e complemento

const Provider = mongoose.model('Provider', {
  name: String,
  corporateName: String,
  cnpj: String,
  segment: String,
  address: [Address],
  phone: String,
  email: String
})

module.exports = Provider