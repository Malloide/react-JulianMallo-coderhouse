// src/components/NavBar.jsx
import { Link } from 'react-router-dom';

const NavBar = ({ toggleTheme }) => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <ul className="flex space-x-4">
                <li><Link to="/">Calculadora</Link></li>
                <li><Link to="/resultados">Resultados</Link></li>
                <li><Link to="/historial">Historial</Link></li>
                <li><Link to="/grafico">Gráfico</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
