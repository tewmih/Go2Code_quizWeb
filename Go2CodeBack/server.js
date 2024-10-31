// const mongoose =require('mongoose');
// const app=require('./App/app')
// const dotenv=require('dotenv');

// dotenv.config({path:'./config.env'})

// mongoose.connect(process.env.LOCAL_CON_STR)
//         .then(()=>{
//             console.log('Database connection established')
//           .catch((error)=>{
//               console.log('Error',error);
//               process.exit(1);
//             })
            
  
  
//   app.listen(3005,'localhost',()=>{
//       console.log('server listening on port ',process.env.PORT);
//   })})

const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=require('./App/app.js')


dotenv.config({path:'./config.env'})

const port=process.env.PORT

// database connection
mongoose.connect(process.env.LOCAL_CONN_STR)
        .then((connObj)=>{
            // console.log(connObj)
            console.log('Database connection succeed! ')
        }).then((err)=>{
        app.listen(port,'localhost',()=>{
            console.log('server listening on port ',process.env.PORT);
           })
        })
        .catch((error)=>console.log(error))


// process.on('unhandledRejection',(err)=>{
//     console.log(err.name,err.message)

//     server.close(()=>{
//         process.exit(1)
//     })
// })