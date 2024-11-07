// src/components/CalculatorForm.jsx
import React, { useState } from 'react';

const CalculatorForm = ({ onCalculate }) => {
    const [nombre, setNombre] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('hombre');
    const [diasEjercicio, setDiasEjercicio] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate({ nombre, peso: parseFloat(peso), altura: parseFloat(altura), edad: parseInt(edad), genero, diasEjercicio: parseInt(diasEjercicio) });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input type="number" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)} required />
            <input type="number" placeholder="Altura (cm)" value={altura} onChange={(e) => setAltura(e.target.value)} required />
            <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
            </select>
            <input type="number" placeholder="Días de Ejercicio por Semana" value={diasEjercicio} onChange={(e) => setDiasEjercicio(e.target.value)} required />
            <button type="submit">Calcular</button>
        </form>
    );
};

export default CalculatorForm;
