import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ConfigEdit() {
  const { configID } = useParams();
  const [config, setConfig] = useState({});
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
  }, [configID]);

  function handleChange(e) {
    setConfig({ ...config, [e.target.name]: e.target.value });
  }

  function handleChangeQuestions(e, index) {
    const clone = { ...config };

    if (e.target.name === "question") {
      clone.questions[index].question = e.target.value;
    } else if (e.target.name === "answer") {
      clone.questions[index].answer = e.target.value;
    } else if (e.target.name === "choice1") {
      clone.questions[index].choices[0] = e.target.value;
    } else if (e.target.name === "choice2") {
      clone.questions[index].choices[1] = e.target.value;
    } else if (e.target.name === "choice3") {
      clone.questions[index].choices[2] = e.target.value;
    } else if (e.target.name === "choice4") {
      clone.questions[index].choices[3] = e.target.value;
    }

    setConfig(clone);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      delete config._id;
      await axios.put(
        `https://ironrest.herokuapp.com/short-cruds/${configID}`,
        config
      );
      navigate("/configs");
      toast.success("Configuração editada com sucesso!");
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
      toast.success("Configuração deletada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao deletar a configuração!");
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
                name="author"
                onChange={handleChange}
                value={config.author}
                spellCheck="false"
                required
              />
            </Form.Group>
            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="name">Nome</Form.Label>
              <Form.Control
                id="name"
                name="name"
                value={config.name}
                spellCheck="false"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="description">Descrição</Form.Label>
              <Form.Control
                id="description"
                name="description"
                value={config.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="create-inputs mb-2">
              <Form.Label htmlFor="difficult">Dificuldade</Form.Label>
              <Form.Select
                id="difficult"
                name="difficult"
                value={config.difficult}
                onChange={handleChange}
                required
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
                <Accordion.Item
                  key={Math.random() * 1000 * index}
                  eventKey={index}
                >
                  <Accordion.Header>Pergunta #{index + 1}</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="create-inputs mb-2">
                      <Form.Label htmlFor="question">Pergunta</Form.Label>
                      <Form.Control
                        id="question"
                        name="question"
                        value={question.question}
                        onChange={(e) => handleChangeQuestions(e, index)}
                      />
                    </Form.Group>

                    <Form.Group className="create-inputs mb-2">
                      <Form.Label htmlFor="choices">Alternativas</Form.Label>

                      <Form.Control
                        className="mb-2"
                        id="choices"
                        name="choice1"
                        value={question.choices[0]}
                        onChange={(e) => handleChangeQuestions(e, index)}
                      />
                      <Form.Control
                        className="mb-2"
                        id="choices"
                        name="choice2"
                        value={question.choices[1]}
                        onChange={(e) => handleChangeQuestions(e, index)}
                      />
                      <Form.Control
                        className="mb-2"
                        id="choices"
                        name="choice3"
                        value={question.choices[2]}
                        onChange={(e) => handleChangeQuestions(e, index)}
                      />
                      <Form.Control
                        className="mb-2"
                        id="choices"
                        name="choice4"
                        value={question.choices[3]}
                        onChange={(e) => handleChangeQuestions(e, index)}
                      />
                    </Form.Group>

                    <Form.Group className="create-inputs mb-2">
                      <Form.Label htmlFor="answer">Resposta</Form.Label>
                      <Form.Select
                        id="answer"
                        name="answer"
                        defaultValue={question.answer}
                        onChange={(e) => handleChangeQuestions(e, index)}
                      >
                        <option value={question.choices[0]}>
                          {question.choices[0]}
                        </option>
                        <option value={question.choices[1]}>
                          {question.choices[1]}
                        </option>
                        <option value={question.choices[2]}>
                          {question.choices[2]}
                        </option>
                        <option value={question.choices[3]}>
                          {question.choices[3]}
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
          <div className="btns-config">
            <Link to={`/configs/edit/${config._id}`}>
              <button
                className="button btn-green"
                type="submit"
                onClick={handleSubmit}
              >
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
