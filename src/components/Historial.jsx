import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Historial = () => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const storedHistorial = JSON.parse(localStorage.getItem('historialCalculos')) || [];
        setHistorial(storedHistorial);
    }, []);

    const borrarHistorial = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('historialCalculos');
                setHistorial([]);
                Swal.fire('¡Eliminado!', 'Tu historial ha sido borrado.', 'success');
            }
        });
    };

    return (
        <div className="historial-container">
            <h2>Historial</h2>
            <ul>
                {historial.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
            <button onClick={borrarHistorial} className="borrar-historial">Borrar Historial</button>
        </div>
    );
};

export default Historial;
