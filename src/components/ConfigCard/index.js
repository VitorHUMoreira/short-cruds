import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ConfigCard({ config }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{config.name}</Card.Header>
        <Card.Body>
          <Card.Text>{config.description}</Card.Text>
          <div className="btns-config">
            <Link to={`/play/${config._id}`}>
              <button className="button">
                <i className="fa-solid fa-play me-2"></i>JOGAR
              </button>
            </Link>
            <Link to={`/configs/${config._id}`}>
              <button className="button">
                <i className="fa-solid fa-eye me-2"></i>VER CONFIGURAÇÃO
              </button>
            </Link>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <i className="fa-solid fa-user me-2"></i>Criado por:{" "}
          {config.created_by}
        </Card.Footer>
      </Card>
    </>
  );
}

export default ConfigCard;
