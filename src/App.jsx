
import { useState } from 'react';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import Clock from './Clock';
import ProjectList from './ProjectList';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Clock />
      <ProjectList />
      <QuickNote />
      <TodoList />

      <p>Ai apasat de {count} ori</p>
      <button style={{margin:"5px"}} onClick={() => setCount(count + 1)}>Click</button>
      <button style={{margin:"5px"}} onClick={() => setCount(count - 1)}>Unclick</button>
      <button style={{margin:"5px"}} onClick={() => setCount(0)}>Reset</button>
      
      <ContactForm />
      
    </div>
);

}
  
export default App;