function Card(props) {
    return (
        <div>
            <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>{props.title}</h3>
            <p style={{ fontSize: '15px', color: 'var(--text)' }}>{props.description}</p>
        </div>
    );
}
export default Card;