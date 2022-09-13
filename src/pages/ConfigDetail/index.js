import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ConfigDetail() {
  const { configID } = useParams();
  const [config, setConfig] = useState({});
  const [reload, setReload] = useState(false);
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
    <div className="body">
      <h2 className="mb-3">CONFIG DETAIL</h2>
    </div>
  );
}

export default ConfigDetail;
