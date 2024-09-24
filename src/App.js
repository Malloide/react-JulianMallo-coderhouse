import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import Resultados from './components/Resultados';
import Historial from './components/Historial';
import Grafico from './components/Grafico';
import './styles.css';

const App = () => {
    const [resultados, setResultados] = useState([]);
    const [graficoData, setGraficoData] = useState([]);

    const calcularMetabolismoBasal = (peso, altura, edad, genero) => {
        if (genero === 'hombre') {
            return 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
        } else {
            return 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
        }
    };

    const calcularCaloriasConActividad = (metabolismoBasal, diasEjercicio) => {
        let factorActividad = [1.2, 1.375, 1.55, 1.725, 1.9][Math.min(diasEjercicio, 4)];
        return metabolismoBasal * factorActividad;
    };

    const calcularCaloriasDefinicion = (caloriasConActividad) => caloriasConActividad * 0.8;
    const calcularCaloriasVolumen = (caloriasConActividad) => caloriasConActividad * 1.2;

    const handleCalculate = ({ nombre, peso, altura, edad, genero, diasEjercicio }) => {
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

        // Guardar en el historial
        const historialActual = JSON.parse(localStorage.getItem('historialCalculos')) || [];
        historialActual.push(resultadosCalculados.join(' | '));
        localStorage.setItem('historialCalculos', JSON.stringify(historialActual));
    };

    return (
        <div className="app">
            <h1>Calculadora de Calorías</h1>
            <CalculatorForm onCalculate={handleCalculate} />
            <Resultados resultados={resultados} />
            <Historial />
            <Grafico data={graficoData} />
        </div>
    );
};

export default App;
