const titulo = document.getElementById('header')
const img = document.getElementById('evolucao')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString); 
var evolucao = urlParams.get('evolucao')
evolucao = evolucao.toLowerCase()

var pokemon
const response = fetch(`https://pokeapi.co/api/v2/pokemon/${evolucao}`).then((res) => res.json()).then(data => {

    img.innerHTML = `<h1>Imfromacao sobre ${evolucao} </h1>
    <img
    src="${data.sprites.front_shiny}"
    alt="${evolucao}"
    id="pokemon-page"
    />` 
})
/* */

titulo.innerHTML = `<h1>Pagina do ${evolucao}</h1>`
