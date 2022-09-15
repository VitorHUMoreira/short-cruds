import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import correctMP3 from "../../assets/correct.mp3";
import wrongMP3 from "../../assets/wrong.mp3";

function Play() {
  const { configID } = useParams();
  const [config, setConfig] = useState({ questions: [] });
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [round, setRound] = useState(0);
  const [points, setPoints] = useState(0);
  const correctRef = useRef();
  const audioCorrect = new Audio(correctMP3);
  audioCorrect.volume = 0.6;
  const audioWrong = new Audio(wrongMP3);
  audioWrong.volume = 0.2;

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
    e.target.disabled = true;
    const correctTint = correctRef.current;
    correctTint.disabled = true;
    if (e.target.innerText === config.questions[round].answer) {
      e.target.classList.add("correct-answer");
      audioCorrect.play();
      setTimeout(() => {
        setPoints(points + 1);
        setRound(round + 1);
        setCurrentQuestion(config.questions[round + 1]);
      }, 2000);
    } else {
      e.target.classList.add("wrong-answer");
      audioWrong.play();
      correctTint.classList.add("correct-answer");
      setTimeout(() => {
        setRound(round + 1);
        setCurrentQuestion(config.questions[round + 1]);
      }, 2000);
    }
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
            <h3 className="mt-2 question-h3">
              <strong>{currentQuestion.question}?</strong>
            </h3>
            <ProgressBar
              now={((round + 1) * 100) / config.questions.length}
              label={`${round + 1} / ${config.questions.length}`}
              className="progress shadow-sm"
            />
            {currentQuestion.choices.map((choice) => {
              return (
                <button
                  ref={
                    choice === config.questions[round].answer
                      ? correctRef
                      : null
                  }
                  key={choice}
                  onClick={(e) => handleChoice(e)}
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
