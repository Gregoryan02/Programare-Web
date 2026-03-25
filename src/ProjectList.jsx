import {useState, useEffect} from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/gresit.json')
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
            {projects.map(project => (
                <Card key={project.id} title={project.title} description={project.tech} />
            ))}
        </div>

    );
}
export default ProjectList;