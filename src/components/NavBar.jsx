// src/components/NavBar.jsx
import { Link } from 'react-router-dom';

const NavBar = ({ toggleTheme }) => {
	return (
		<nav className="bg-gray-800 p-4 flex  items-center">
			<ul className="flex gap-4 justify-center">
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
			<div className="flex-1 flex justify-end items-end">
				<button
					onClick={toggleTheme}
					className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-500"
				>
					{toggleTheme ? '🌞' : '🌙'}
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
