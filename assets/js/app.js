

const urlGeneral = "https://thesimpsonsapi.com/api/characters";
const urlDetalle= "https://thesimpsonsapi.com/api/characters/";

//guardar personajes
let personajesGlobal = [];

const contenedorPersonajes = document.getElementById("contenedor-personajes");
const inputBusqueda = document.getElementById("input-busqueda");
const btnBuscar = document.getElementById("btn-buscar");
const mensajeError = document.getElementById("mensaje-error");

