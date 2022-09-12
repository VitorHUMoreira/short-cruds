import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../../App.css";

function NavBar() {
  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none brand">
            {`<short></cruds>`}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="hamburg" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          className="hamburg-collapse-items"
          id="basic-navbar-nav"
        >
          <Nav className="me-auto">
            <hr className="hamburg-hr" />
            <Link className="nav-link hamburg-collapse-item" to="/">
              Menu
            </Link>
            <hr className="hamburg-hr" />

            <Link className="nav-link hamburg-collapse-item" to="/play">
              Jogar
            </Link>
            <hr className="hamburg-hr" />

            <Link className="nav-link hamburg-collapse-item" to="/configs">
              Configurações
            </Link>
            <hr className="hamburg-hr" />

            <Link className="nav-link hamburg-collapse-item" to="/about">
              Sobre
            </Link>
            <hr className="hamburg-hr" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
