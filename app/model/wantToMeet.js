const mongoose = require('mongoose')

const Schema = mongoose.Schema

const meetSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    image : {
        type: String,
        required: true
    },
    visitors : [{
        type : Schema.Types.ObjectId,
        ref : 'Visitor'
    }]
})

const Meet = mongoose.model('Meet', meetSchema)

module.exports = {
    Meet
}