import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="menu body shadow-sm">
      <Link to="/configs">
        <button className="button btn-menu">
          <i className="fa-solid fa-play me-2"></i>JOGAR
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
