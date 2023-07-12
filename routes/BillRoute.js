const express = require('express');
const Bill = require('../model/Bill');
const auth = require('../middleware/auth');

const router = express.Router()

module.exports = router;

//Insert Data
router.post('/Bill', auth, async (req, res) => {
    const data = new Bill({
        CustomerId:req.body.CustomerId,
        CustomerName:req.body.CustomerName,
        TotalAmount:req.body.TotalAmount,
        TotalItem:req.body.TotalItem,
        Items:req.body.Items,
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
router.get('/Bill', auth, async (req, res) => {
    try{
        const data = await Bill.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by ID Method
router.get('/Bill/:id', auth, async (req, res) => {
    try{
        const data = await Bill.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method

router.patch('/Bill/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Bill.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/Bill/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Bill.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})