import {useState} from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    function handleSubmit() {
        if(name.trim() === '' || email.trim() === '' || message.trim() === '') {
            setFeedback('Completeaza toate campurile!');
            return;
        }
        setFeedback(`Multumim, ${name}!`);
    }

    return (<div>
    <ul style={{listStyle:"none", padding:0}}>
     <li><input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nume" /></li>
        <li><input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" /></li>
        <li><textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesaj" /></li>
        <li><button onClick = {handleSubmit}>Trimite</button></li>
        <li>{feedback}</li>
    </ul>
    </div>)
}
export default ContactForm;