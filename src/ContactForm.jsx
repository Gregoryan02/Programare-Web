import { useState } from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    function handleSubmit() {
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            setFeedback('Completeaza toate campurile!');
            return;
        }
        setFeedback(`Multumim, ${name}!`);
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <div className="form-section">
            <div className="form-group">
                <label>Nume</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Introdu-ți numele" />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Introdu-ți adresa de email" />
            </div>
            <div className="form-group">
                <label>Mesaj</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Introdu-ți mesajul..." />
            </div>
            <button onClick={handleSubmit}>Trimite</button>
            {feedback && <p style={{ marginTop: '16px', color: feedback.includes('Mulțu') ? 'var(--accent)' : '#dc2626' }}>{feedback}</p>}
        </div>
    )
}
export default ContactForm;