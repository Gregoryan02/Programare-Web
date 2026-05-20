const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const cors = require('cors');
app.use(cors());
const PORT = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(function(){
        console.log('Conectat la MongoDB!');
    })
    .catch(function(err){
        console.error('Eroare conectare MongoDB',err);
    });
// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});
app.get('/api/projects', async function(req,res){
    try{
        const projects = await Project.find();
        res.json(projects);
    } catch(err){
        res.status(500).json({error: 'Eroare',err});
    }
});

app.get('/api/projects/:id',async function(req,res){
    const project = await Project.findById(req.params.id);
    if(project != null)
        res.json(project);
    else
        res.status(404).json({error: 'Not found'});
});

app.delete('/api/projects/:id',async function(req,res){
    const project = await Project.findByIdAndDelete(req.params.id);
    if(!project)
        res.status(404).json({error: 'Not found'});
    else{
        res.json({message: 'Deleted'});
    }
});

/*app.get('/api/stats',function(req,res){
    let total = projects.length;
    let finalizate = projects.filter(p => p.done == true).length;
    let inLucru = total-finalizate;
    res.json({nrProiecte:total, proiecteFinalizate:finalizate,proiecteInLucru:inLucru});
});*/

app.post('/api/projects',async function(req, res){
    try{
    const newProject = new Project({
        title: req.body.title,
        tech: req.body.tech,
        done: req.body.done || false,
    });
    const saved = await newProject.save();
    res.status(201).json(saved);
    } catch(err){
        res.status(400).json({error: err.message});
    }
});
// Porneste serverul
app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});
app.put('/api/projects/:id',async function(req,res){
    try{
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!updated) return res.status(404).json({error: 'Not found'});
        res.json(updated);
    } catch(err){
        res.status(400).json({error: err.message});
    }
});