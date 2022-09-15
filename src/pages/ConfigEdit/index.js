import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function ConfigEdit() {
  const { configID } = useParams();
  const [config, setConfig] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  function handleChange(e) {
    setConfig({ ...config, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("https://ironrest.herokuapp.com/short-cruds", config);
      navigate("/configs");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/short-cruds/${configID}`
      );

      navigate("/configs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="body shadow-sm">
      <h2 className="mb-3">
        <i className="fa-solid fa-pen-to-square me-2"></i>EDITAR
      </h2>
      {!loading && (
        <div className="container-game">
          <Form className="form-container">
            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="author">Autor</Form.Label>
              <Form.Control
                id="author"
                onChange={handleChange}
                value={config.author}
                spellCheck="false"
              />
            </Form.Group>
            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="name">Nome</Form.Label>
              <Form.Control
                id="name"
                value={config.name}
                spellCheck="false"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="description">Descrição</Form.Label>
              <Form.Control
                id="description"
                value={config.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="difficult">Dificuldade</Form.Label>
              <Form.Select
                id="difficult"
                value={config.difficult}
                onChange={handleChange}
              >
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
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
            <Link to={`/configs/edit/${config._id}`}>
              <button className="button btn-green" onClick={handleSubmit}>
                <i className="fa-solid fa-check me-2"></i>SALVAR
              </button>
            </Link>

            <button className="button btn-delete" onClick={handleDelete}>
              <i className="fa-solid fa-trash me-2"></i>DELETAR
            </button>
          </div>
        </div>
      )}
      <Link to={`/configs/${config._id}`}>
        <button className="button mt-3">
          <i className="fa-solid fa-arrow-left me-2"></i>VOLTAR
        </button>
      </Link>
    </div>
  );
}

export default ConfigEdit;
