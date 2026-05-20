import {useState, useEffect} from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [title,setTitle] = useState('');
    const [tech,setTech] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingTech, setEditingTech] = useState('');



    function SearchProject(){
        return projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/projects')
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Eroare la incarcarea proiectelor  '+err);
                setLoading(false);
                console.warn(err);
            })
    }, []);

    async function handleSubmit(){
        try{
            const response = await fetch('http://localhost:3000/api/projects',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: title, tech:tech})
            });
            const newProject = await response.json();
            setProjects([...projects,newProject]);
            setTitle('');
            setTech('');
            
        }catch (err){
            console.error('Eroare: ', err);
        }
    }
    async function handleDelete(id){
            const respone = await fetch('http://localhost:3000/api/projects/'+id,{
                method: 'DELETE'
            });
            setProjects(projects.filter(p => p._id !== id));
    }
    async function handleToogle(id,currentDone){
        try{
            const response = await fetch('http://localhost:3000/api/projects/'+id,{
                method:'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({done:!currentDone})
            });
            const UpdateProject = await response.json();
            setProjects(projects.map(p => p._id === id ? UpdateProject : p));
        } catch (err) {
            console.error('Eroare la actualizarea proiectului:', err);
        }
    }
    async function handleEdit(id){
        try{
            const response = await fetch('http://localhost:3000/api/projects/'+id,{
                method:'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: editingTitle, tech: editingTech})
            });
            const updatedProject = await response.json();
            setProjects(projects.map(p => p._id === id ? updatedProject : p));
            setEditingId(null);
            setEditingTitle('');
            setEditingTech('');
        } catch (err) {
            console.error('Eroare la actualizarea proiectului:', err);
        }
    }
    function EditForm(editingId,title,tech,project){
        if(editingId !== null)
            return (
                <div>
                    <h5>Title</h5>
                    <input value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />
                    <h5>Tech</h5>
                    <input value={editingTech} onChange={(e) => setEditingTech(e.target.value)} />
                    <p></p>
                    <button onClick={() => handleEdit(editingId)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
            );
        else
            return(
                    <div>
                    <Card key={project.id} title={project.title} description={project.tech} />
                    <button onClick={() => handleDelete(project._id)}>Sterge</button>
                    <button onClick={() => handleToogle(project._id, project.done)}>{project.done?'\u{2610}':'\u{2611}'}</button>
                    <button onClick={() => {
                        setEditingId(project._id);
                        setEditingTitle(project.title);
                        setEditingTech(project.tech);
                    }}>Edit</button>
                    </div>
                );

    }

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;
    return(
        <div>
            <h3>Proiecte</h3>
            {SearchProject().map(project => (
                EditForm(editingId, editingTitle, editingTech, project)
            ))}
            <h3>Adauga un proiect</h3>
            <h5>Title</h5>
            <input
                value={title}
                onChange={(e) =>{setTitle(e.target.value)}}
            />
            <h5>Tech</h5>
            <input
                value={tech}
                onChange={(e) => {setTech(e.target.value)}}
            />
            <p></p>
            <button onClick={handleSubmit}>Submit</button>
            <h3>Search</h3>
            <input
            value = {search}
            onChange = {(e) => setSearch(e.target.value)}
            />
            <ol>
            <li> Total proiecte: {projects.length}</li>
            <li> Finalizate: {projects.filter(p => p.done).length}</li>
            <li> In Lucru: {projects.filter(p => !p.done).length}</li>
            </ol>
        </div>

    );
}
export default ProjectList;