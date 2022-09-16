import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Accordion, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Questions from "../../components/Questions";

function CreateConfig() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    author: "",
    questions: [],
  });

  const startRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    startRef.current.focus();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("https://ironrest.herokuapp.com/short-cruds", form);
      navigate("/configs");
    } catch (error) {
      console.log(error);
    }
  }

  function handleDeleteQuestion(index) {
    const clone = { ...form };

    clone.questions.splice(index, 1);
    setForm(clone);
  }

  return (
    <div className="body shadow-sm">
      <h2 className="mb-3">
        <i className="fa-solid fa-plus me-2"></i>CRIAR CONFIGURAÇÃO
      </h2>
      <div className="container-game">
        <Form onSubmit={handleSubmit} className="form-container">
          <Form.Group className="create-inputs mb-2">
            <Form.Label htmlFor="author">Autor</Form.Label>
            <Form.Control
              ref={startRef}
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Autor da configuração"
              required
            />
          </Form.Group>

          <Form.Group className="create-inputs mb-2">
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.Control
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome da configuração"
              required
            />
          </Form.Group>

          <Form.Group className="create-inputs mb-2">
            <Form.Label htmlFor="description">Descrição</Form.Label>
            <Form.Control
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição da configuração"
              required
            />
          </Form.Group>

          <Form.Group className="create-inputs mb-2">
            <Form.Label htmlFor="difficult">Dificuldade</Form.Label>
            <Form.Select
              name="difficult"
              onChange={handleChange}
              defaultValue=""
              required
            >
              <option value="" disabled hidden>
                Selecione uma dificuldade
              </option>
              <option value="Fácil">Fácil</option>
              <option value="Médio">Médio</option>
              <option value="Difícil">Difícil</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Questions form={form} setForm={setForm} />
          </Form.Group>

          <Form.Label>Perguntas</Form.Label>

          <Accordion>
            {form.questions.map((question, index) => {
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
                    <button
                      className="button btn-trash mt-3"
                      onClick={() => {
                        handleDeleteQuestion(index);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>

          <button className="button mt-4 btn-green" type="submit">
            <i className="fa-solid fa-right-to-bracket me-2"></i>CRIAR
          </button>
        </Form>
      </div>
    </div>
  );
}

export default CreateConfig;
