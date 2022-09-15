import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

function Play() {
  const { configID } = useParams();
  const [config, setConfig] = useState({ questions: [] });
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setLoading(true);
    async function fetchConfigs() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/short-cruds/${configID}`
        );
        setConfig(response.data);
        setCurrentQuestion(response.data.questions[round]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchConfigs();
  }, [configID, round]);

  function handleChoice(e) {
    setRound(round + 1);
    setCurrentQuestion(config.questions[round + 1]);
  }

  return (
    <>
      {!loading && config.questions.length > round && (
        <div className="body shadow-sm">
          <h6 className="mb-3">
            JOGANDO: <strong>{config.name}</strong>
            <br />
            AUTOR: <strong>{config.author}</strong>
          </h6>

          <div className="container-game">
            <h3 className="mt-2">
              <strong>{currentQuestion.question}?</strong>
            </h3>
            <ProgressBar
              now={((round + 1) * 100) / config.questions.length}
              label={`${round + 1} / ${config.questions.length}`}
              className="progress"
            />
            {currentQuestion.choices.map((choice) => {
              return (
                <button
                  key={choice}
                  onClick={handleChoice}
                  className="button btn-menu"
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!loading && +config.questions.length === round && (
        <div className="body shadow-sm">
          <div className="container-game">
            <h3 className="mt-2">FIM DE JOGO</h3>
            <h5>
              Você <span className="span-correct">acertou</span>{" "}
              <strong>{points}</strong> de{" "}
              <strong>{config.questions.length}</strong> perguntas.
            </h5>
            <Link to={`/configs/${configID}`}>
              <button className="button">
                <i className="fa-solid fa-rotate-right me-2"></i>JOGAR NOVAMENTE
              </button>
            </Link>
            <Link to="/configs">
              <button className="button">
                <i className="fa-solid fa-gear me-2"></i>CONFIGURAÇÕES
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Play;
