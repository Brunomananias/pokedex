import React from 'react';

export default function Modal({isOpen, setModalOpen, pokemonNome, pokemonImagem}) {

    console.log(pokemonNome)
    const backgroundStyle = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7',
        zIdex: '1000'
    }

    const ModalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%',
        color: 'black',
        padding: '150px',
        backgroundColor: '#ffffff',
        borderRadius: '8px'
    }

    if(isOpen){
        return (
            
        <div style={backgroundStyle}>
            <div style={ModalStyle}>
            <div>
            <img src={pokemonImagem} alt="Imagem no Modal" style={{width: '200px', marginBottom: '30px'}}/>
            </div>
            <div>
            <p>Nome : {pokemonNome}</p>
            </div>
            
            
            
            <button onClick={setModalOpen}>Fechar</button>
            </div>
        </div>
       
        )
    }

    return null
}