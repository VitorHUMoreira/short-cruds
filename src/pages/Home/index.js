import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-xxl menu">
      <Link to="/play">
        <button className="button btn-menu">JOGAR</button>
      </Link>
      <Link to="/configs">
        <button className="button btn-menu">CONFIGURAÇÕES</button>
      </Link>
      <Link to="/about">
        <button className="button btn-menu">SOBRE</button>
      </Link>
    </div>
  );
}

export default Home;
