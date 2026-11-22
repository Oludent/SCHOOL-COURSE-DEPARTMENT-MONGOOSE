const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI

mongoose.connect(URI).then(()=>{
    console.log(`Connected to database successfully`)
}).catch((error)=>{
    console.log(`Failed to connect to database`, error.message)
})