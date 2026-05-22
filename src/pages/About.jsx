function About() {
    return (
        <div className="page-content">
            <h2>Despre mine</h2>

            <div style={{ marginTop: '32px', textAlign: 'left', maxWidth: '600px', margin: '32px auto 0' }}>
                <h3>Nume</h3>
                <p>Haita Grigore</p>

                <h3>Educație</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>
                        <strong>Colegiul Național Grigore Moisil Onești</strong>
                        <br />
                        Profil: Științe ale Naturii
                        <br />
                        Perioada: 2020-2024
                    </li>
                    <li style={{ marginTop: '12px' }}>
                        <strong>Universitatea Transilvania din Brașov</strong>
                        <br />
                        Facultatea: IESC
                        <br />
                        Profil: Calculatoare
                        <br />
                        Perioada: 2024-prezent
                    </li>
                </ul>

                <h3>Hobby-uri</h3>
                <ul style={{ paddingLeft: '20px' }}>
                    <li>Starcraft 2</li>
                    <li>Fotografie</li>
                    <li>PCB Design</li>
                </ul>
            </div>
        </div>
    );
}

export default About;