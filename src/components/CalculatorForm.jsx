import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CalculatorForm = ({ onCalculate }) => {
    const [nombre, setNombre] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('hombre');
    const [diasEjercicio, setDiasEjercicio] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (diasEjercicio < 0 || diasEjercicio > 7) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El número de días de ejercicio debe estar entre 0 y 7.'
            });
            return;
        }

        onCalculate({ nombre, peso, altura, edad, genero, diasEjercicio });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            
            <label>Peso (kg):</label>
            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} required />
            
            <label>Altura (cm):</label>
            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} required />
            
            <label>Edad:</label>
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} required />
            
            <label>Género:</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
            </select>
            
            <label>Días de ejercicio por semana:</label>
            <input type="number" value={diasEjercicio} onChange={(e) => setDiasEjercicio(e.target.value)} required />
            
            <button type="submit">Calcular</button>
        </form>
    );
};

export default CalculatorForm;
