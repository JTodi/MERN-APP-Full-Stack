const router = require('express').Router();
const DataModel = require('../Models/model');


router.post('/api/give', async (req, res)=>{
  try{
    const newItem = new DataModel({
      men: req.body.men,
      women: req.body.women,
      boys: req.body.boys,
      girls: req.body.girls,
    })
    const saveItem = await newItem.save()
    res.status(200).json(saveItem);
  }catch(err){
    res.json(err);
  }
})


router.get('/api/recieve', async (req, res)=>{
  try{
    const allItems = await DataModel.find({});
    res.status(200).json(allItems)
  }catch(err){
    res.json(err);
  }
})


router.put('/api/give/:id', async (req, res)=>{
  try{
    const updateItem = await DataModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(updateItem);
  }catch(err){
    res.json(err);
  }
})

module.exports = router;
