import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h2 className="techs__lead">7 технологий</h2>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__stack">
        <li className="techs__stack-item">HTML</li>
        <li className="techs__stack-item">CSS</li>
        <li className="techs__stack-item">JS</li>
        <li className="techs__stack-item">React</li>
        <li className="techs__stack-item">Git</li>
        <li className="techs__stack-item">Express.js</li>
        <li className="techs__stack-item">MongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;