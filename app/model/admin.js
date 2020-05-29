const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                validator.isEmail(value)
            },
            message: function () {
                return 'Invalid email format'
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

// Check email and password before saving
adminSchema.pre('save', function (next) {
    const admin = this
    // Checking whether the email is new or not
    if (admin.isNew) {
        //encoding the password
        bcryptjs.genSalt(10)
            .then(function (salt) {
                bcryptjs.hash(admin.password, salt)
                    .then(function (encryptPassword) {
                        admin.password = encryptPassword
                        next()
                    })
            })
    } else {
        next()
    }
})

// Generating a token is an instance method , we create our own methods on schema
adminSchema.methods.generateToken = function(){
    const admin = this
    const tokenData = {
        _id : admin._id,
        username : admin.username,
        createdAt : Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    admin.tokens.push({
        token
    })
    return admin.save()
        .then(function(admin){
            return Promise.resolve({
                admin : {
                    _id : admin._id,
                    username : admin.username,
                    email : admin.email
                },
                token
            })
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}

// findByCredentials() is a static method
adminSchema.statics.findByCredentials = function(email, password){
    const Admin = this
    return Admin.findOne({ email })
    .then(function(admin){
        if(!admin){
            return Promise.reject({ notice: 'Invalid email / password'})
        }
        return bcryptjs.compare(password, admin.password)
        .then(function(result){
            if(result){
                return Promise.resolve(admin)
            }else{
                return Promise.reject({ notice: 'Invalid email / password'})
            }

        })
    })
    .catch(function(err){
        return Promise.reject(err)
        })
}

adminSchema.statics.findByToken = function(token){
    const Admin = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    }catch(err){
        return Promise.reject(err)
    }
    return Admin.findOne({
        _id : tokenData._id,
        'tokens.token' : token
    })
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = {
    Admin
}
