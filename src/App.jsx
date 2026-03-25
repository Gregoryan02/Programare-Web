import Card from './Card';
import { useState } from 'react';
import QuickNote from './QuickNote';

function App() {
  const projects = [
    { title: "Proiect 1", description: "Pagina personala cu HTML si CSS" },
    { title: "Proiect 2", description: "Pagina interactiva cu JavaScript" },
    { title: "Proiect 3", description: "Dashboard cu React" },
    { title: "Proiect 4", description: "Aplicatie mobila cu React Native" },
    { title: "Proiect 5", description: "Backend API cu Node.js si Express" },
  ];
  const [count, setCount] = useState(0);

  return (
    <div>

      {projects.map((project, index)=>{
        return <Card key={index} title={project.title} description={project.description} />;
      })}

      <QuickNote />

      <p>Ai apasat de {count} ori</p>
      
      <button style={{margin:"5px"}} onClick={() => setCount(count + 1)}>Click</button>
      <button style={{margin:"5px"}} onClick={() => setCount(count - 1)}>Unclick</button>
      <button style={{margin:"5px"}} onClick={() => setCount(0)}>Reset</button>
    </div>
);

}
  
export default App;