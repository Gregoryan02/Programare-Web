import Card from './Card';

function App() {
  const projects = [
    { title: "Proiect 1", description: "Pagina personala cu HTML si CSS" },
    { title: "Proiect 2", description: "Pagina interactiva cu JavaScript" },
    { title: "Proiect 3", description: "Dashboard cu React" },
    { title: "Proiect 4", description: "Aplicatie mobila cu React Native" },
    { title: "Proiect 5", description: "Backend API cu Node.js si Express" },
  ];
  return (
    <div>
      {projects.map((project, index)=>{
        return <Card key={index} title={project.title} description={project.description} />;
      })}

    </div>

);
}

export default App;