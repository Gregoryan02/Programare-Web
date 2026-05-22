import { Link } from "react-router";

function NotFound() {
    return (
        <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
            <h2>404 - Pagina nu există</h2>
            <p style={{ marginBottom: '24px' }}>Ne pare rău, pagina pe care o cauți nu a fost găsită.</p>
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: 'var(--accent)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s'
            }}>
                Înapoi la Home
            </Link>
        </div>
    );
}

export default NotFound;