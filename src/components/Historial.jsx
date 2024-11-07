// src/components/Historial.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { db } from '../FireBase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Historial = () => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const fetchHistorial = async () => {
            const querySnapshot = await getDocs(collection(db, 'historialCalculos'));
            const historialData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setHistorial(historialData);
        };

        fetchHistorial();
    }, []);

    const borrarHistorial = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const querySnapshot = await getDocs(collection(db, 'historialCalculos'));
                querySnapshot.forEach(async (docSnapshot) => {
                    await deleteDoc(doc(db, 'historialCalculos', docSnapshot.id));
                });

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
                    <li key={index}>{entry.resultados.join(" | ")}</li>
                ))}
            </ul>
            <button onClick={borrarHistorial} className="borrar-historial">Borrar Historial</button>
        </div>
    );
};

export default Historial;
