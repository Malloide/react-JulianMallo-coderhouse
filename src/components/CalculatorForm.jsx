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
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-md mx-auto space-y-4">
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="number" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="number" placeholder="Altura (cm)" value={altura} onChange={(e) => setAltura(e.target.value)} required className="w-full p-2 border rounded" />
            <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} required className="w-full p-2 border rounded" />
            <select value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full p-2 border rounded">
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
            </select>
            <input type="number" placeholder="Días de Ejercicio por Semana" value={diasEjercicio} onChange={(e) => setDiasEjercicio(e.target.value)} required className="w-full p-2 border rounded" />
            <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">Calcular</button>
        </form>
    );
};

export default CalculatorForm;
