import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfigCard from "../../components/ConfigCard";

function Configs() {
  const [search, setSearch] = useState("");
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchConfigs() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/short-cruds"
        );
        setConfigs(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchConfigs();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="body">
      <h2 className="mb-3">
        <i className="fa-solid fa-gear me-2"></i>CONFIGURAÇÕES
      </h2>
      {!loading && (
        <>
          <Link to="/create-config">
            <button className="button mb-4">
              <i className="fa-solid fa-plus me-2"></i>CRIAR CONFIGURAÇÃO
            </button>
          </Link>

          <Form.Control
            type="search"
            className="mb-3"
            value={search}
            onChange={handleSearch}
            placeholder="Procure uma configuração"
          />

          <div className="container-config-cards">
            {configs
              .filter((config) => {
                return (
                  config.name.toLowerCase().includes(search.toLowerCase()) ||
                  config.created_by
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  config.difficult.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((config) => {
                return <ConfigCard key={config._id} config={config} />;
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Configs;
