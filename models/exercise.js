
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})


let Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;