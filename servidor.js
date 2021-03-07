//Por questões de estética apenas, esta aplicação deve ser rodada preferencialmente no browser da mozilla firefox.

//1 - Criar um servidor express
const express = require('express');
const app = express();
const axios = require('axios');

//-- Lista de pokemons
let pokemons = [
    'pikachu',
    'charmander',
    'squartle',
    'bulbasaur',
    'pineco',
    'kadabra',
    'mew',
    'mewtwo'
];

// 2 - Rota para trazer a lista de pokemons
app.get('/pokemon', (req, res) => {
    const { nome } = req.query; // 3 - Query param para filtrar  pokemons por nome
    let listaRetorno = pokemons.filter(i => i.includes(nome || ''));
    return res.json(listaRetorno);
});


//Módulo axios criado
let requirer = axios.create({
    baseURL: ''
})

//Buscador pokemons na api da PokeDex
requirer.get('https://pokeapi.co/api/v2/pokemon?limit=1118&offset=1').then( answer => {
    const {results} = answer.data;

    app.get('/apipokemon', (req, res) => {
    const { nome } = req.query;
    let listaRetorno = results.filter(i => i.name.includes(nome || ''));
    return res.json(listaRetorno);
    });
});

app.listen(3002, () => console.log('servidor rodando na porta'));