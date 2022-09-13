import { useState } from "react";
import { Form } from "react-bootstrap";
import ConfigCard from "../../components/ConfigCard";

function Configs() {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="container-xxl">
      <h1>CONFIGURAÇÕES</h1>

      <Form.Control
        type="search"
        className="mb-3"
        value={search}
        onChange={handleSearch}
        placeholder="Procure uma configuração"
      />

      <div className="container-config-cards">
        <ConfigCard />
        <ConfigCard />
      </div>
    </div>
  );
}

export default Configs;
