import {useState, useEffect} from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [title,setTitle] = useState('');
    const [tech,setTech] = useState('');



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

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;
    return(
        <div>
            <h3>Proiecte</h3>
            {SearchProject().map(project => (
                <Card key={project.id} title={project.title} description={project.tech} />
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
            <input></input>
        </div>

    );
}
export default ProjectList;