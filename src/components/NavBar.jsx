// src/components/NavBar.jsx
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Calculadora</Link>
                </li>
                <li>
                    <Link to="/resultados">Resultados</Link>
                </li>
                <li>
                    <Link to="/historial">Historial</Link>
                </li>
                <li>
                    <Link to="/grafico">Gráfico</Link>
                </li>
            </ul>
            <button className="theme-btn">🌙</button> 
        </nav>
    );
};

export default NavBar;
