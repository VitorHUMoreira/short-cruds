import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clockImg from "../../assets/clock.png";
import lifesImg from "../../assets/heart.png";

function Play() {
  const { configID } = useParams();
  const [config, setConfig] = useState({ questions: [] });
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const [round, setRound] = useState(0);

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
  }, []);

  function handleChoice(e) {
    setRound(round + 1);
    setCurrentQuestion(config.questions[round + 1]);
  }

  return (
    <>
      {!loading && config.questions.length > round && (
        <div className="body">
          <h6 className="mb-3">
            JOGANDO: <strong>{config.name}</strong>
            <br />
            POR: <strong>{config.created_by}</strong>
          </h6>

          <div className="container-game">
            <div className="container-game-infos">
              {config.lifes && (
                <>
                  <img
                    className="lifes-img"
                    src={lifesImg}
                    height={40}
                    alt="clock"
                  />
                  <span className="lifes">{config.lifes}</span>
                </>
              )}
              {config.time && (
                <>
                  <img
                    className="clock-img"
                    src={clockImg}
                    height={44}
                    alt="clock"
                  />
                  <span className="time">{config.time}</span>
                </>
              )}
            </div>
            <h3 className="mt-2">{currentQuestion.question}?</h3>
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
        <div className="body">
          <div className="container-game">
            <h3 className="mt-2">FIM DE JOGO</h3>
            <Link to="/">
              <button className="button">JOGAR NOVAMENTE</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Play;
