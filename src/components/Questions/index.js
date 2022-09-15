import { useState, useRef } from "react";
import { Form } from "react-bootstrap";

function Questions({ form, setForm }) {
  const [formQuestion, setFormQuestion] = useState({
    question: "",
    choices: [],
    answer: "",
  });

  const questionRef = useRef();

  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");

  function handleChange(e) {
    setFormQuestion({ ...formQuestion, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    questionRef.current.focus();

    try {
      const cloneQuestion = { ...formQuestion };
      cloneQuestion.choices = [choice1, choice2, choice3, choice4];

      const clone = { ...form };
      delete clone._id;

      clone.questions.push(cloneQuestion);

      setForm(clone);
      setFormQuestion({
        question: "",
      });
      setChoice1("");
      setChoice2("");
      setChoice3("");
      setChoice4("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form.Group className="create-inputs mb-2">
        <Form.Label htmlFor="question">Pergunta</Form.Label>
        <Form.Control
          ref={questionRef}
          id="question"
          name="question"
          value={formQuestion.question}
          onChange={handleChange}
          placeholder="Texto da pergunta"
          required
        />
      </Form.Group>

      <Form.Group className="create-inputs mb-2">
        <Form.Label htmlFor="choices">Alternativas</Form.Label>
        <Form.Control
          className="mb-2"
          id="choices"
          name="choice1"
          value={choice1}
          onChange={(e) => setChoice1(e.target.value)}
          placeholder="Texto da alternativa"
          required
        />
        <Form.Control
          className="mb-2"
          id="choices"
          name="choice2"
          value={choice2}
          onChange={(e) => setChoice2(e.target.value)}
          placeholder="Texto da alternativa"
          required
        />
        <Form.Control
          className="mb-2"
          id="choices"
          name="choice3"
          value={choice3}
          onChange={(e) => setChoice3(e.target.value)}
          placeholder="Texto da alternativa"
          required
        />
        <Form.Control
          id="choices"
          name="choice4"
          value={choice4}
          onChange={(e) => setChoice4(e.target.value)}
          placeholder="Texto da alternativa"
          required
        />
      </Form.Group>

      <Form.Group className="create-inputs mb-2">
        <Form.Label htmlFor="answer">Resposta</Form.Label>
        <Form.Select id="answer" name="answer" onChange={handleChange} required>
          <option value={choice1}>{choice1}</option>
          <option value={choice2}>{choice2}</option>
          <option value={choice3}>{choice3}</option>
          <option value={choice4}>{choice4}</option>
        </Form.Select>
      </Form.Group>
      <button onClick={handleSubmit} className="mt-2 button btn-plus mb-3">
        <i className="fa-solid fa-plus"></i>
      </button>
    </>
  );
}

export default Questions;
