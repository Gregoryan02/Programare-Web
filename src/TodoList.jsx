import { useState } from "react";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    function handleAdd() {
        if(input.trim() === '') return; //Nu adauga taskuri goale
        setTodos([...todos, input]); //Creeaza array NOU cu tot ce era + inputul
        setInput(''); //Reseteaza inputul 
    }
    return (
        <div>
            <h3>Todo List</h3>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Adauga un task..."
            />
            <button onClick={handleAdd}>Adauga</button>

            <ul>
                {todos.map(function(todos,index){return <li key={index}>{todos}</li>})}
            </ul>
        </div>
    )}
    export default TodoList