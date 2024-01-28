import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgress, Grid } from '@mui/material'
import { Container } from '@mui/system'
import Navbar from '../components/Navbar'
import PokemonCard from '../components/PokemonCard'
import { useSpring, animated, Paper } from 'react-spring';
import Modal from '../components/Modal'

export const Home = () => {

    const [openModal, setOpenModal] = useState(false)
    const [pokemonIndividual, setPokemonIndividual] = useState('')
    const [imagemPokemon, setImagemPokemon] = useState('')
    const [tipoPokemon, setTipoPokemon] = useState('')

    //Função que abre ao iniciar o site
    const [pokemons, setPokemons] = useState([]) 
    useEffect(() => {
        getPokemons()
    },[])
    

    const carregarPokemon = async (key) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${key + 1}/`);
            const nome = response.data.name;
            const imagem = response.data.sprites.front_default
            setPokemonIndividual(nome);
            setImagemPokemon(imagem);
          } catch (error) {
            console.error('Erro ao obter dados da API', error);
          }
        };

    //Buscar todos os pokemons

    const getPokemons = () => {
        var endpoints = []
        for(var i = 1; i<50;  i++)
        {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }
        console.log(endpoints)
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
    }

    //FILTRA POKEMON POR NOME

    const pokemonFilter = (name) => {
        var filteredPokemons = []

        if(name === ""){
            getPokemons()
        }
        for(var i in pokemons){
            if(pokemons[i].data.name.includes(name)){
                filteredPokemons.push(pokemons[i])
            }
        }
        setPokemons(filteredPokemons)
    }
    
    return (
        <div style={{backgroundColor: '#2c313a'}}> 
                <div>
                <Grid container spacing={3}>
                    <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} pokemonNome={pokemonIndividual} pokemonImagem={imagemPokemon}>
                    </Modal>
                </Grid>
        </div>
            <Navbar pokemonFilter={pokemonFilter}/>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    {pokemons.length === 0 ? ( 
                        <CircularProgress/>  
                    ) : (
                    pokemons.map((pokemon, key) => (
                    <Grid onClick={() => {setOpenModal(true);  carregarPokemon(key)}} item xs={12} sm={6} md={4} lg={2} key={key}>
                    <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                    </Grid>
                    ))
                    )}
                </Grid>
            </Container>
        </div>
    )
}