const express=require('express');
const cors=require('cors')

const authRouter=require('../Routs/authRouter');
const questionRouter=require('../Routs/questionRouter');

const app=express();

app.use(cors())

app.use(express.json())

app.use('/Go2Code/quiz/auth',authRouter);
app.use('/Go2Code/quiz/questions',questionRouter);


module.exports=app;