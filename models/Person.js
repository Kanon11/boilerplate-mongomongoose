const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true
    },
    age: {
        type: Number,
        required:true
    },
    favoriteFoods: {
        type: [String],
        required: false
    }
})
const Person = mongoose.model('Person', personSchema);
module.exports = Person
