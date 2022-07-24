const mongoose = require('mongoose')
const schema = mongoose.Schema

const authorScema = new schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Autor', authorScema)