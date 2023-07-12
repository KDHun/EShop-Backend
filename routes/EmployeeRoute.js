const express = require('express');
const Employee = require('../model/Employee');
const auth = require('../middleware/auth');
const router = express.Router()

module.exports = router;

//Insert Data
router.post('/Employee', auth, async (req, res) => {
    const data = new Employee({
        FirstName:req.body.FirstName,
        MiddleName:req.body.MiddleName,
        LastName:req.body.LastName,
        DOB:req.body.DOB,
        Phone:req.body.Phone,
        Email:req.body.Email,
        Salary:req.body.Salary,
        Role:req.body.Role
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
router.get('/Employee', auth, async (req, res) => {
    try{
        const data = await Employee.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by ID Method
router.get('/Employee/:id', auth, async (req, res) => {
    try{
        const data = await Employee.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Update by ID Method

router.patch('/Employee/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Employee.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method
router.delete('/Employee/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Employee.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})