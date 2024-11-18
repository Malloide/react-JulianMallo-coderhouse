import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './FireBase/firebaseConfig';
import CalculatorForm from './components/CalculatorForm';
import Resultados from './components/Resultados';
import Historial from './components/Historial';
import Grafico from './components/Grafico';
import NavBar from './components/NavBar';
import './styles.css';

const App = () => {
    const [resultados, setResultados] = useState([]);
    const [graficoData, setGraficoData] = useState([]);
    const [darkTheme, setDarkTheme] = useState(false);

    // Cambia el tema de toda la página aplicando clases CSS
    useEffect(() => {
        if (darkTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
    }, [darkTheme]);

    // Función para alternar el tema
    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    const calcularMetabolismoBasal = (peso, altura, edad, genero) => {
        return genero === 'hombre'
            ? 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad)
            : 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
    };

    const calcularCaloriasConActividad = (metabolismoBasal, diasEjercicio) => {
        const factorActividad = [1.2, 1.375, 1.55, 1.725, 1.9][Math.min(diasEjercicio, 4)];
        return metabolismoBasal * factorActividad;
    };

    const calcularCaloriasDefinicion = (caloriasConActividad) => caloriasConActividad * 0.8;
    const calcularCaloriasVolumen = (caloriasConActividad) => caloriasConActividad * 1.2;

    const handleCalculate = async ({ nombre, peso, altura, edad, genero, diasEjercicio }) => {
        const metabolismoBasal = calcularMetabolismoBasal(peso, altura, edad, genero);
        const caloriasConActividad = calcularCaloriasConActividad(metabolismoBasal, diasEjercicio);
        const caloriasDefinicion = calcularCaloriasDefinicion(caloriasConActividad);
        const caloriasVolumen = calcularCaloriasVolumen(caloriasConActividad);

        const resultadosCalculados = [
            `Nombre: ${nombre}`,
            `Metabolismo Basal: ${metabolismoBasal.toFixed(2)} calorías`,
            `Calorías con Actividad: ${caloriasConActividad.toFixed(2)} calorías`,
            `Calorías para Definición: ${caloriasDefinicion.toFixed(2)} calorías`,
            `Calorías para Volumen: ${caloriasVolumen.toFixed(2)} calorías`
        ];

        setResultados(resultadosCalculados);
        setGraficoData([metabolismoBasal, caloriasConActividad, caloriasDefinicion, caloriasVolumen]);

        Swal.fire({
            icon: 'info',
            title: '¡Cálculo completado!',
            text: 'Dirígete a la sección de resultados para ver los detalles.',
            confirmButtonText: 'OK'
        });

        try {
            await addDoc(collection(db, 'historialCalculos'), { resultados: resultadosCalculados });
        } catch (error) {
            console.error("Error guardando el historial:", error);
        }
    };

    return (
        <Router>
            <div className={`${darkTheme ? 'bg-blue-100 text-gray-900' : 'bg-blue-900 text-white'} min-h-screen transition-colors duration-500`}>
                <NavBar animateLinks={true} />
                
                {/* Botón de cambio de tema en la esquina superior derecha */}
                <div className="absolute top-4 right-4">
                    <button 
                        onClick={toggleTheme}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-500"
                    >
                        {darkTheme ? '🌞' : '🌙'}
                    </button>
                </div>

                {/* Contenido principal */}
                <div className="flex justify-center mt-6">
                    <Routes>
                        <Route path="/" element={<CalculatorForm onCalculate={handleCalculate} />} />
                        <Route path="/resultados" element={<Resultados resultados={resultados} />} />
                        <Route path="/historial" element={<Historial resultados={resultados} />} />
                        <Route path="/grafico" element={<Grafico data={graficoData} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
