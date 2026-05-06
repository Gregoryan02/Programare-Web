const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Project = require('./models/Project');
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

/*app.get('/api/projects/:id', function(req,res){
    let project = projects.find(p => p.id == parseInt(req.params.id));
    if(project != null)
        res.json(project);
    else
        res.status(404).json({error: 'Not found'});
});*/

/*app.delete('/api/projects/:id', function(req,res){
    let index = projects.findIndex(p => p.id == parseInt(req.params.id));
    if(index === -1)
        res.status(404).json({error: 'Not found'});
    else{
        projects.splice(index, 1);
        res.json({message: 'Deleted'});
    }
});*/

/*app.get('/api/stats',function(req,res){
    let total = projects.length;
    let finalizate = projects.filter(p => p.done == true).length;
    let inLucru = total-finalizate;
    res.json({nrProiecte:total, proiecteFinalizate:finalizate,proiecteInLucru:inLucru});
});*/

app.post('/api/projects',function(req, res){
    const newProject = {
        id: projects.length+1,
        title: req.body.title,
        tech: req.body.tech,
        done: req.body.done || false,
    };
    projects.push(newProject);
    res.status(201).json(newProject);
});
// Porneste serverul
app.listen(PORT, function() {
    console.log('Server pornit pe http://localhost:' + PORT);
});