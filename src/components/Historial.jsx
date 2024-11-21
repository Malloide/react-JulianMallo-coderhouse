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
			text: '¡No podrás revertir esto!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, bórralo!',
			cancelButtonText: 'Cancelar',
		}).then(async result => {
			if (result.isConfirmed) {
				const querySnapshot = await getDocs(collection(db, 'historialCalculos'));
				querySnapshot.forEach(async docSnapshot => {
					await deleteDoc(doc(db, 'historialCalculos', docSnapshot.id));
				});

				setHistorial([]);
				Swal.fire('¡Eliminado!', 'Tu historial ha sido borrado.', 'success');
			}
		});
	};

	return (
		<div className="grid grid-rows-3 from-[#1a1a2e] to-[#121212] bg-gradient-to-t   rounded-md">
			<div>
				<h2 className="text-xl text-center p-2">Historial de Cálculos</h2>
			</div>
			<div>
				<ul className="p-2 flex flex-col gap-2 ">
					{historial.length > 0 ? (
						<>
							{historial.map((entry, index) => (
								<li key={index} className="">
									{entry.resultados.join(' | ')}
								</li>
							))}
						</>
					) : (
						<div className="flex justify-center">
							<span className="loader"></span>
						</div>
					)}
				</ul>
			</div>
			<div className="flex justify-center items-end pb-4">
				<button onClick={borrarHistorial} className="bg-red-600 p-2 w-30 h-14 rounded-md">
					Borrar Historial
				</button>
			</div>
		</div>
	);
};

export default Historial;
