const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middleware/authenticate')

const { Admin } = require('../model/admin')

router.get('/', (req, res) => {
    Admin.find()
        .then(admin => {
            res.send(admin)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/register', (req, res) => {
    Admin.countDocuments({}, function (err, count) {
        if (count == 0) {
            const body = req.body
            const admin = new Admin(body)
            admin.save()
                .then(() => {
                    res.send({
                        redirect: true,
                        message: "Successfully registered"
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        }
        else {
            res.send({
                redirect:false,
                message: "Sorry, There will be only one Admin!"
            })
        }
    })

})

router.post('/login', (req, res) => {
    const body = req.body
    Admin.findByCredentials(body.email, body.password)
        .then(admin => {
            //generating a token
            return admin.generateToken()
        })
        .then(admin => {
            //response with a generated token
            res.send(admin)
        })
        .catch(err => {
            res.status('404').send(err)
        })

})


router.get('/account', authenticateUser, (req, res) => {
    const { user } = req
    res.send(user)
})


router.delete('/logout', authenticateUser, function (req, res) {
    const { admin, token } = req
    Admin.findByIdAndUpdate(admin._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send({ notice: 'successfully logged out' })
        })
        .catch((err) => {
            res.send(err)
        })

})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Admin.findByIdAndDelete(id)
        .then(admin => {
            res.send(admin)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = {
    adminController: router
}