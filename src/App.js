import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Play from "./pages/Play";
import Configs from "./pages/Configs";
import CreateConfig from "./pages/CreateConfig";
import ConfigDetail from "./pages/ConfigDetail";
import ConfigEdit from "./pages/ConfigEdit";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<Error />} />

        <Route path="/configs" element={<Configs />} />

        <Route path="/configs/:configID" element={<ConfigDetail />} />

        <Route path="/configs/edit/:configID" element={<ConfigEdit />} />

        <Route path="/create-config" element={<CreateConfig />} />

        <Route path="/play/:configID" element={<Play />} />

        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
