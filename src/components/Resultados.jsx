import React from 'react';

const Resultados = ({ resultados }) => {
    return (
        <div>
            <h2>Resultados:</h2>
            {resultados.map((resultado, index) => (
                <p key={index}>{resultado}</p>
            ))}
        </div>
    );
};

export default Resultados;
