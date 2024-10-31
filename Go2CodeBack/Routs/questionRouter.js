const express = require('express');
const questionController=require('../Controller/questionController')

const questionRouter=express.Router();
console.log('question router')
questionRouter.post('/postQuestions',questionController.postQuestions);
questionRouter.post('/getQuestions',questionController.getQuestions);

module.exports = questionRouter