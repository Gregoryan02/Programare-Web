function Footer() {
    return (
        <footer style={{
            marginTop: 'auto',
            borderTop: '1px solid var(--border)',
            padding: '24px 32px',
            background: 'var(--card-bg)',
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--text)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <div>
                    <strong>Email:</strong>
                    <a href="mailto:grigore.haita@student.untibv.ro" style={{ color: 'var(--accent)', textDecoration: 'none', marginLeft: '8px' }}>
                        grigore.haita@student.untibv.ro
                    </a>
                </div>
                <div>
                    <strong>© 2024 Grigore Haita</strong>
                </div>
            </div>
        </footer>
    )
}
export default Footer;