const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const { Visitor } = require('../model/visitor')
const smtpTransport = require('nodemailer-smtp-transport')
const { Meet } = require('../model/wantToMeet')
const base64Img = require('base64-img');

//getting all the visitors details
router.get('/', (req, res) => {
    Visitor.find().populate('meet')
        .then((visitor) => {
            res.send(visitor)
        })
        .catch((err) => {
            res.send(err)
        })
})

// Adding a visitor
router.post('/', (req, res) => {
    const body = req.body
    base64Img.img(body.image, './assets', '1', (err, filepath) => {
        if (err) { return err }
        else { return ('successful') }
    })
    // find the employee id and send the mail to the perticular employee, who the visitor wants to meet.
    Meet.findById(body.meet)
        .then(person => {
            // Send the mail using nodemailer
            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'ranganath.developer@gmail.com',
                    pass: 'rangu@md123'
                }
            }));

            let mailOptions = {
                from: "ranganath.developer@gmail.com",
                to: person.email,   // employee email
                subject: "Message from Code Army",
                text: `${body.name} from ${body.company} wants to meet you \n Here is the detail of visitor
                    \n Email : ${body.email} \n Contact : ${body.phone}`,
                html: `<div>
                        <img src="cid:${body.image}"/>
                        Hello ${person.name},
                        <br/> ${body.name} from ${body.company} wants to meet you <br/>
                        Email : ${body.email} <br/> Contact : ${body.phone}
                    </div>`,
                attachments: [{   // file on disk as an attachment
                    filename: '1.jpg',
                    path: './assets/1.jpg' // stream this file
                }],
            }

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    return "Not able to send an email"
                } else {
                    return 'Email sent successfully'
                }
            })
        })
        .catch(err => {
            res.send(err)
        })

    //create an instance of visitor because save() is instance method
    const visitor = new Visitor(body)
    visitor.save()
        .then((visitor) => {
            // find the employee id and then push the visitor id to perticular employee record
            const { meet } = visitor
            Meet.findById(meet)
                .then(meet => {
                    meet.visitors.push(visitor._id)
                    meet.save()
                        .then(() => { })
                        .catch(err => {
                            res.send(err)
                        })
                })
                .catch(err => {
                    res.send(err)
                })
            res.send(visitor)
        })
        .catch((err) => {
            res.send(err)
        })
})

//deleting the visitor record
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Visitor.findByIdAndDelete(id)
        .then((visitor) => {
            res.send(visitor)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    visitorController: router
}