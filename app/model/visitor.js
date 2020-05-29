const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const visitorSchema = new Schema({
    name : {
        type : String,
        required : "Please enter your name"
    },
    company : {
        type : String,
        required : "provide your company name"
    },
    email : {
        type : String,
        required : "Provide your email",
        validate : function(value){
            return validator.isEmail(value)
        },
        message : function(){
            return 'invalid email format'
        }
    },
    phone : {
        type : String,
        required : "provide your phone number",
        minlength : 10,
        maxlength : 10
    }, 
    meet : {
        type : Schema.Types.ObjectId,
        ref : "Meet"
    },
    image : {
        type : String
    },
    designation : {
        type : String
    },
    visitedAt : {
        type : Date,
        default : Date.now
    }
    
})

const Visitor = mongoose.model('Visitor', visitorSchema)

module.exports = {
    Visitor
}