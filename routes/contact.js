const express = require('express')
const router = express.Router()
var Contact = require('../models/contact')

router.get('/', (req, res, next)=>{
    Contact.find((err, contacts)=>{
        if(err){
            console.log('error : ',err)
        } else {
            res.json({title: "Liste des contacts", contact: contacts})
        }
    })
    // res.json({message: 'Hello'})
})

router.post('/', (req, res, next)=>{
    var contact = new Contact({
        fullName: req.body.contactName, 
        phone: req.body.contactNumber
    })
    contact.save((err, newContact)=>{
        if(err){
            console.log('There is an error : ',err)
        } else {
            res.json(newContact)
        }
    })
})

router.get('/:id', (req, res, next)=>{
    Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.delete('/:id', (req, res, next)=> {
    Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('contact deleted!'))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.put('/:id', (req, res, next)=> {
    Contact.findById(req.params.id)
    .then(contact =>{
        contact.fullName= req.body.fullName;
        contact.phone= req.body.phone;
    })
    .then(() => res.json('contact updated!'))
    .catch(err => res.status(400).json('Error: '+ err));
})


module.exports = router