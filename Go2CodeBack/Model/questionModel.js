const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,  // Consider marking it as required if `filePath` is essential
    },
    catagory:{
        type: String,
        enum:['Science','General','Maths','History',],
        required: true,
        unique: true
    }
});

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;  // Use module.exports for CommonJS
