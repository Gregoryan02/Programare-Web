import {useState, useEffect} from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const [search, setSearch] = useState('');

    function SearchProject(){
        return projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    useEffect(() => {
        fetch('/data/projects.json')
            .then(response => response.json())
            .then(data => {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch(err => {
                setError('Eroare la incarcarea proiectelor');
                setLoading(false);
                console.warn(err);
            })
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;
    return(
        <div>
            <h3>Proiecte</h3>
            {SearchProject().map(project => (
                <Card key={project.id} title={project.title} description={project.tech} />
            ))}
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