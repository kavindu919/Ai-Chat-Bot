import express from 'express'

const app = express()

//middleware for reaing json
app.use(express.json())

//connection and listner
app.listen(5000, ()=>{console.log("Server is running!")})