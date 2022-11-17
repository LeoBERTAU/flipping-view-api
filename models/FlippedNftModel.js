const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FlippedNftModel = new Schema({
    name: {
        type: String,
        require: true
    },
    contractAddress: {
        type: String,
        require: true
    }

}, { timestamps: true})


module.exports = mongoose.model('Hotnft', FlippedNftModel)