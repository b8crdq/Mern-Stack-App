const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
        
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// Routes 2
router.post('/addnote',fetchuser,[
    body('title','Enter a Vald Title').isLength({min : 3}),
    body('description','Description must be at least 5 characters').isLength({min : 5},)
    
],async (req,res)=>{
    // const notes = await Notes.find({user: req.user.id});
    try {
        
        const {title, description, tag} = req.body;
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const note = new Notes({
            title, description,tag,date: new Date() ,user : req.user.id
        })
        const savenote = await note.save()
        
        res.json(savenote);
    } 
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
     }

 })

 // Route 3  /api/notes/updateallnotes 
 router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    // const notes = await Notes.find({user: req.user.id});
    
    const {title, description, tag} = req.body;
    const newNotes = {};    
        if(title){newNotes.title = title};
        if(description){newNotes.description =description};
        if(tag){newNotes.tag = tag};

        
       let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note=  await Notes.findByIdAndUpdate(req.params.id, {$set : newNotes},{new : true})
        res.json(note);
    
     

 })


 router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
    // const notes = await Notes.find({user: req.user.id});
    
    // const {title, description, tag} = req.body;
    // const newNotes = {};    
        // if(title){newNotes.title = title};
        // if(description){newNotes.description =description};
        // if(tag){newNotes.tag = tag};
        try {
        
        
       let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note=  await Notes.findByIdAndDelete(req.params.id);
        res.json({Successfully : "Deleted the notes", note : note});
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")
         }

 })


module.exports = router;