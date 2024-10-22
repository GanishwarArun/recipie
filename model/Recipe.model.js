const mongoose = require('mongoose');

//schema 
const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('recipe', RecipeSchema);    