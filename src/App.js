import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/sobre-mi">Sobre mí</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

function Inicio() {
  return <h1>Bienvenido a la página de inicio</h1>;
}

function SobreMi() {
  return <h1>Esta es la página "Sobre mí"</h1>;
}

function Contacto() {
  return <h1>Contáctame en: contacto@example.com</h1>;
}

export default App;