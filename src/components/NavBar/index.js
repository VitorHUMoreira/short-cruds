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
            <Link className="nav-link hamburg-collapse-item" to="/">
              Menu
            </Link>

            <Link className="nav-link hamburg-collapse-item" to="/play">
              Jogar
            </Link>

            <Link className="nav-link hamburg-collapse-item" to="/configs">
              Configurações
            </Link>

            <Link className="nav-link hamburg-collapse-item" to="/about">
              Sobre
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
