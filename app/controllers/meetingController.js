const express = require('express')
const router = express.Router()
const { Meet } = require('../model/wantToMeet')
const { upload } = require("../middleware/multer")

// getting all the employee details
router.get('/', (req, res) => {
    Meet.find().populate('visitors')
        .then((visitor) => {
            res.send(visitor)
        })
        .catch((err) => {
            res.send(err)
        })
})

//Getting a particular employee with id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Meet.findById(id).populate('visitors')
        .then((visitor) => {
            res.send(visitor)
        })
        .catch((err) => {
            res.send(err)
        })
})

// Updating an employee record
router.put('/:id', upload.single('image'), (req, res) => {
    const imageUrl = "http://localhost:3005" + req.file.destination.slice(1, (req.file.destination.length)) + req.file.filename
    const id = req.params.id
    const body = req.body
    Meet.findByIdAndUpdate(id, {
        $set: {
            name: body.name, email: body.email, designation: body.designation, image:imageUrl
        }
    }, { new: true, runValidators: true })
        .then(visitor => {
            res.send(visitor)
        })
        .catch(err => {
            res.send(err)
        })
})

//adding an employee
router.post('/', upload.single('image'), (req, res) => {
    const imageUrl = "http://localhost:3005" + req.file.destination.slice(1, (req.file.destination.length)) + req.file.filename
    const body = req.body
    const meet = new Meet({
        name: body.name,
        email: body.email,
        designation: body.designation,
        image: imageUrl
    })
    meet.save()
        .then((visitor) => {
            res.send(visitor)
        })
        .catch((err) => {
            res.send(err)
        })
})

//Deleting an employee record( find the employee by Id and delete the record )
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Meet.findByIdAndDelete(id)
        .then((visitor) => {
            res.send(visitor)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    meetController: router
}

