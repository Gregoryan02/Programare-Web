import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingTech, setEditingTech] = useState('');

    function SearchProject() {
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
                setError('Eroare la incarcarea proiectelor: ' + err);
                setLoading(false);
                console.warn(err);
            })
    }, []);

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:3000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title, tech: tech })
            });
            const newProject = await response.json();
            setProjects([...projects, newProject]);
            setTitle('');
            setTech('');
        } catch (err) {
            console.error('Eroare: ', err);
        }
    }

    async function handleDelete(id) {
        await fetch('http://localhost:3000/api/projects/' + id, {
            method: 'DELETE'
        });
        setProjects(projects.filter(p => p._id !== id));
    }

    async function handleToogle(id, currentDone) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone })
            });
            const UpdateProject = await response.json();
            setProjects(projects.map(p => p._id === id ? UpdateProject : p));
        } catch (err) {
            console.error('Eroare la actualizarea proiectului:', err);
        }
    }

    async function handleEdit(id) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editingTitle, tech: editingTech })
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

    function renderProject(project) {
        if (editingId === project._id) {
            return (
                <div key={project._id} className="form-section">
                    <div className="form-group">
                        <label>Titlu</label>
                        <input value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Tehnologie</label>
                        <input value={editingTech} onChange={(e) => setEditingTech(e.target.value)} />
                    </div>
                    <button onClick={() => handleEdit(project._id)}>Salvează</button>
                    <button onClick={() => {
                        setEditingId(null);
                        setEditingTitle('');
                        setEditingTech('');
                    }} style={{ background: 'var(--border)', color: 'var(--text-h)' }}>Anulează</button>
                </div>
            );
        }

        return (
            <div key={project._id} className="project-item">
                <div className="project-content">
                    <Card title={project.title} description={project.tech} />
                </div>
                <div className="project-actions">
                    <button onClick={() => handleDelete(project._id)} style={{ background: '#ef4444' }}>
                        Șterge
                    </button>
                    <button onClick={() => handleToogle(project._id, project.done)} style={{ background: project.done ? '#10b981' : '#f59e0b' }}>
                        {project.done ? '✓' : '○'}
                    </button>
                    <button onClick={() => {
                        setEditingId(project._id);
                        setEditingTitle(project.title);
                        setEditingTech(project.tech);
                    }} style={{ background: '#3b82f6' }}>
                        Editează
                    </button>
                </div>
            </div>
        );
    }

    const visibleProjects = editingId ? projects.filter(p => p._id === editingId) : SearchProject();

    if (loading) return <p className="loading">Se încarcă...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <div className="search-box">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Caută proiect..."
                />
            </div>

            {visibleProjects.map(project => renderProject(project))}

            <div className="form-section">
                <h3>Adaugă un proiect</h3>
                <div className="form-group">
                    <label>Titlu</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Introdu titlul proiectului"
                    />
                </div>
                <div className="form-group">
                    <label>Tehnologie</label>
                    <input
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                        placeholder="Ex: React, Node.js, Python"
                    />
                </div>
                <button onClick={handleSubmit}>Adaugă Proiect</button>
            </div>

            <div className="stats-container" style={{ marginTop: '40px' }}>
                <div className="stat-card">
                    <h3>Total</h3>
                    <p className="stat-number">{projects.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Finalizate</h3>
                    <p className="stat-number">{projects.filter(p => p.done).length}</p>
                </div>
                <div className="stat-card">
                    <h3>În Lucru</h3>
                    <p className="stat-number">{projects.filter(p => !p.done).length}</p>
                </div>
            </div>
        </div>
    );
}
export default ProjectList;