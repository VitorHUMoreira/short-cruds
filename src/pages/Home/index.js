import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-xxl menu">
      <Link to="/play">
        <button className="button btn-menu">
          <i className="fa-solid fa-play me-2"></i>JOGAR
        </button>
      </Link>
      <Link to="/configs">
        <button className="button btn-menu">
          <i className="fa-solid fa-gear me-2"></i>CONFIGURAÇÕES
        </button>
      </Link>
      <Link to="/about">
        <button className="button btn-menu">
          <i className="fa-solid fa-circle-info me-2"></i>SOBRE
        </button>
      </Link>
    </div>
  );
}

export default Home;
