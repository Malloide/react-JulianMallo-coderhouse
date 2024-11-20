import React, { createContext, useState } from 'react';

// Crear el contexto
export const GlobalContext = createContext();

// Proveedor del estado global
export const GlobalProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);
  const [calculos, setCalculos] = useState({});
  const [temaOscuro, setTemaOscuro] = useState(true); // Manejo del tema

  const agregarCalculo = (nuevoCalculo) => {
    setHistorial((prev) => [...prev, nuevoCalculo]);
  };

  return (
    <GlobalContext.Provider
      value={{
        historial,
        calculos,
        temaOscuro,
        setCalculos,
        setHistorial,
        agregarCalculo,
        setTemaOscuro,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
