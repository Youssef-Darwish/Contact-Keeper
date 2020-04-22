const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');



// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', auth, async (req, res) => {

    try {
        //find contacts by user id
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }

    res.send("Get all Contacts")
});

// @route     Post api/contacts
// @desc      Add new contact
// @access    Private
router.post('/',
    [
        auth,
        [
            check('name', 'Name is required')
                .not()
                .isEmpty()
        ]
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, type } = req.body;
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })
            const contact = await newContact.save();

            res.json(contact);

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route     Put api/contacts/:id
// @desc      Update Contact
// @access    Private
router.put('/:id', auth, async (req, res) => {

    const { name, email, phone, type } = req.body;

    const contactFields = {};
    if (name) {
        contactFields.name = name;
    }
    if (email) {
        contactFields.email = email;
    }
    if (type) {
        contactFields.type = type;
    }
    if (phone) {
        contactFields.phone = phone;
    }

    try {
        let contact = await Contact.findById(req.params.id);

        //not found
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        //make sure the user update his own contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
        res.json(contact);

    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server Error');

    }


});

// @route     DELETE api/contacts/:id
// @desc      delete Contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {

    try {
        let contact = await Contact.findById(req.params.id);

        //not found
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        //make sure the user update his own contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact Removed' });

    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server Error');

    }

});


module.exports = router;