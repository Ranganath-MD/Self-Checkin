const express = require('express')
var port = process.env.PORT || 3005
const { mongoose } = require('./config/database')
const cors = require('cors')
const path = require('path')

const app = express()

const { visitorController } = require('./app/controllers/visitorController')
const { meetController } = require('./app/controllers/meetingController')
const { adminController } = require('./app/controllers/adminController')
app.use(cors())
app.use(express.json())
app.use('/visitors', visitorController)
app.use('/wantToMeet', meetController)
app.use('/admin', adminController)

// app.use(express.static(path.join(__dirname, "client/build")))
// app.get("*",  (req, res)=>{
//     res.sendFile(path.join(__dirname, "/client/build/index.html"))
// })
app.use('/assets/uploads', express.static(__dirname + '/assets/uploads'));


app.listen(port, () => {
    console.log('connected to port ', port)
})