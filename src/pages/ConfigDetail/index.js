import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Form, InputGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function ConfigDetail() {
  const { configID } = useParams();
  const [config, setConfig] = useState({});
  const [reload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchConfigs() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/short-cruds/${configID}`
        );
        setConfig(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchConfigs();
  }, [configID, reload]);

  return (
    <div className="body shadow-sm">
      <h2 className="mb-3">
        <i className="fa-solid fa-gear me-2"></i>CONFIGURAÇÃO
      </h2>
      {!loading && (
        <div className="container-game">
          <Form className="form-container">
            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="author">Autor</Form.Label>
              <Form.Control
                id="author"
                value={config.author}
                readOnly
                spellCheck="false"
              />
            </Form.Group>
            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="name">Nome</Form.Label>
              <Form.Control
                id="name"
                value={config.name}
                spellCheck="false"
                readOnly
              />
            </Form.Group>

            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="description">Descrição</Form.Label>
              <Form.Control
                id="description"
                value={config.description}
                readOnly
                spellCheck="false"
              />
            </Form.Group>

            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="difficult">Dificuldade</Form.Label>
              <Form.Select id="difficult" disabled>
                <option>{config.difficult}</option>
              </Form.Select>
            </Form.Group>
          </Form>

          <Form.Label>Perguntas</Form.Label>

          <Accordion className="accordion-container mb-2">
            {config.questions.map((question, index) => {
              return (
                <Accordion.Item key={question.question} eventKey={index}>
                  <Accordion.Header>Pergunta #{index + 1}</Accordion.Header>
                  <Accordion.Body>
                    <InputGroup>
                      <InputGroup.Text className="text-question mb-1">
                        Pergunta: {question.question}
                      </InputGroup.Text>
                      {question.choices.map((choice, index) => {
                        return (
                          <InputGroup.Text
                            className="text-question mb-1"
                            key={choice}
                          >
                            {index + 1}ª alternativa: {choice}
                          </InputGroup.Text>
                        );
                      })}
                      <InputGroup.Text className="text-question">
                        Resposta: {question.answer}
                      </InputGroup.Text>
                    </InputGroup>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
          <div className="btns-config">
            <Link to={`/play/${config._id}`}>
              <button className="button">
                <i className="fa-solid fa-play me-2"></i>JOGAR
              </button>
            </Link>

            <Link to={`/configs/edit/${config._id}`}>
              <button className="button">
                <i className="fa-solid fa-pen-to-square me-2"></i>EDITAR
              </button>
            </Link>
          </div>
        </div>
      )}
      <Link to={`/configs`}>
        <button className="button mt-3">
          <i className="fa-solid fa-arrow-left me-2"></i>VOLTAR
        </button>
      </Link>
    </div>
  );
}

export default ConfigDetail;
