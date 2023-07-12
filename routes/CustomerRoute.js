const express = require('express');
const Customer = require('../model/Customer');
const auth = require('../middleware/auth');
const router = express.Router()

module.exports = router;

//Insert Data
router.post('/Customer', auth, async (req, res) => {
    const data = new Customer({
        FirstName:req.body.FirstName,
        MiddleName:req.body.MiddleName,
        LastName:req.body.LastName,
        DOB:req.body.DOB,
        Phone:req.body.Phone,
        Email:req.body.Email
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get All Data
router.get('/Customer', auth, async (req, res) => {
    try{
        const data = await Customer.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by ID Method
router.get('/Customer/:id', auth, async (req, res) => {
    try{
        const data = await Customer.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method

router.patch('/Customer/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Customer.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/Customer/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Customer.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})