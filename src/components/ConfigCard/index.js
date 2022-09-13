import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ConfigCard() {
  return (
    <>
      <Card className="text-center">
        <Card.Header>NOME DA CONFIG</Card.Header>
        <Card.Body>
          <Card.Text>CONFIG DESC</Card.Text>
          <div className="btns-config">
            <Link to="/configs">
              <button className="button">
                <i className="fa-solid fa-play me-2"></i>JOGAR
              </button>
            </Link>
            <Link to="/configs">
              <button className="button">
                <i className="fa-solid fa-eye me-2"></i>VER CONFIGURAÇÃO
              </button>
            </Link>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <i className="fa-solid fa-user me-2"></i>Criado por: CRIADOR
        </Card.Footer>
      </Card>
    </>
  );
}

export default ConfigCard;
