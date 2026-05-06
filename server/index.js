const express = require('express');
const app = express();
const PORT = 3000;
const projects = [
    { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
    { id: 2, title: "Calculator Buget", tech: "JS", done: true },
    { id: 3, title: "Dashboard React", tech: "React", done: false },
    { id: 4, title: "API Meteo", tech: "React, API", done: false },
];
app.use(express.json());
// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});
app.get('/api/projects', function(req,res){
    res.json(projects);
})

app.get('/api/projects/:id', function(req,res){
    let project = projects.find(p => p.id == parseInt(req.params.id))
    if(project != null)
        res.json(project)
    else
        res.status(404).json({error: 'Not found'})
});

app.get('/api/stats',function(req,res){
    let total = projects.length;
    let finalizate = projects.filter(p => p.done == true).length;
    let inLucru = total-finalizate;
    res.json({nrProiecte:total, proiecteFinalizate:finalizate,proiecteInLucru:inLucru});
});

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