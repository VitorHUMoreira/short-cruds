import Alert from "react-bootstrap/Alert";
import img404 from "../../assets/404.svg";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container-xxl">
      <Alert className="teste" variant="danger">
        <img src={img404} width={250} alt="404" />
        <Alert.Heading>Opa, página não encontrada !!!</Alert.Heading>
        <br />
        <p>
          Parece que você tentou acessar uma página que não existe em nosso
          domínio.
        </p>
        <hr />
        <Link to="/">
          <button className="button">MENU</button>
        </Link>
      </Alert>
    </div>
  );
}

export default Error;
