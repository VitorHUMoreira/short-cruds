import { Link } from "react-router-dom";

function About() {
  return (
    <div className="body">
      <h2 className="mb-3">
        <i className="fa-solid fa-circle-info me-2"></i>SOBRE
      </h2>
      <ul className="about-content">
        <li>
          Jogo desenvolvido para o #2 Projeto do bootcamp de Web Development na
          Ironhack São Paulo, turma #85WDFT.
        </li>
        <li>Inpirado no famoso jogo de celular "Perguntados".</li>
        <li>
          O jogador pode criar, visualizar, editar e deletar as configurações do
          jogo.
        </li>
        <li>Boa sorte no jogo e espero que gostem!</li>
      </ul>

      <Link to="/">
        <button className="button">
          <i className="fa-solid fa-bars me-2"></i>MENU
        </button>
      </Link>
    </div>
  );
}

export default About;
