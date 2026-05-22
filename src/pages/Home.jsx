import { useEffect, useState } from "react";

function Home() {
    const [response, setResponse] = useState({ total: 0, done: 0, inProgress: 0 });

    useEffect(() => {
        fetch('http://localhost:3000/api/stats')
            .then(response => response.json())
            .then(data => {
                setResponse(data);
            })
            .catch(err => {
                console.warn('Eroare la incarcarea statisicilor: ', err);
            })
    }, []);

    return (
        <div className="page-content">
            <h2>Dashboard</h2>
            <p style={{ fontSize: '16px', marginBottom: '32px' }}>Bine ai venit pe dashboard-ul meu</p>

            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Proiecte</h3>
                    <p className="stat-number">{response.total}</p>
                </div>
                <div className="stat-card">
                    <h3>Finalizate</h3>
                    <p className="stat-number">{response.done}</p>
                </div>
                <div className="stat-card">
                    <h3>În Lucru</h3>
                    <p className="stat-number">{response.inProgress}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;