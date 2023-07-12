const express = require("express");
const Item = require("../model/Item");
const auth = require("../middleware/auth");
const router = express.Router();

module.exports = router;

//Insert Data
router.post("/Item", auth, async (req, res) => {
  const data = new Item({
    Name: req.body.Name,
    Price: req.body.Price,
    Discount: req.body.Discount || 0,
    Quanity: req.body.Quanity,
    Description: req.body.Description,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/Items", auth, async (req, res) => {
  try {
    const data = await Item.find({ _id: { $in: req.body } });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Get All Data
router.get("/Item", auth, async (req, res) => {
  try {
    const data = await Item.find();
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by ID Method
router.get("/Item/:id", auth, async (req, res) => {
  try {
    const data = await Item.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Update by ID Method

router.patch("/Item/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Item.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/Items", auth, async (req, res) => {
    let result = [];
    try {
      await Promise.all(
        req.body.map(async (element) => {
          const id = element._id;
          const updatedData = element.data;
          const options = { new: true };
          const updatedResult = await Item.findByIdAndUpdate(id, updatedData, options);
          result.push(updatedResult);
        })
      );
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//Delete by ID Method
router.delete("/Item/:id", auth, async (req, res) => {
  try {
    const data = await Item.findByIdAndDelete(req.params.id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
