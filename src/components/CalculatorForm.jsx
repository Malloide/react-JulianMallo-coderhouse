import React, { useState } from 'react';
import { db } from '../FireBase/firebaseConfig'; // Importa la configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

const CalculatorForm = ({ onCalculate }) => {
    const [nombre, setNombre] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('hombre');
    const [diasEjercicio, setDiasEjercicio] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const calculo = {
                nombre,
                peso: parseFloat(peso),
                altura: parseFloat(altura),
                edad: parseInt(edad),
                genero,
                diasEjercicio: parseInt(diasEjercicio),
            };

            // Realiza el cálculo
            onCalculate(calculo);

            // Guarda los datos en Firebase
            const docRef = await addDoc(collection(db, 'historial'), calculo);
            console.log('Documento agregado con ID: ', docRef.id);

            // Limpia los campos del formulario después de guardar
            setNombre('');
            setPeso('');
            setAltura('');
            setEdad('');
            setGenero('hombre');
            setDiasEjercicio('');
            setError('');
        } catch (error) {
            console.error('Error al guardar en Firebase:', error);
            setError('Hubo un error al guardar los datos. Intenta de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-md mx-auto space-y-4">
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                placeholder="Peso (kg)"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                placeholder="Altura (cm)"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                placeholder="Edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            <select
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="w-full p-2 border rounded"
            >
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
            </select>
            <input
                type="number"
                placeholder="Días de Ejercicio por Semana"
                value={diasEjercicio}
                onChange={(e) => setDiasEjercicio(e.target.value)}
                required
                className="w-full p-2 border rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-500  w-full p-2 rounded hover:bg-blue-600">
                Calcular
            </button>
        </form>
    );
};

export default CalculatorForm;
