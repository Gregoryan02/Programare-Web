import { useEffect,useState } from "react";

function Home() {
    const [response, setResponse] = useState({total:0, done:0, inProgress:0});
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

    return(
        <div>
            <h2>Home</h2>
            <p>Bine ai venit pe dashboard-ul meu</p>
            <ol>
            <li> Total proiecte: {response.total}</li>
            <li> Finalizate: {response.done}</li>
            <li> In Lucru: {response.inProgress}</li>
            </ol>
        </div>
    );
}
export default Home;