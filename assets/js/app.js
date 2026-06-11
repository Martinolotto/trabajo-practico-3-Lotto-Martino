const contenedorPersonajes = document.getElementById('contenedor-personajes');
const inputBusqueda = document.getElementById('input-busqueda');
const btnBuscar = document.getElementById('btn-buscar');
const mensajeError = document.getElementById('mensaje-error');

// variable almacenar personajes
let personajesGlobal = [];


async function obtenerPersonajes() {
    try {
        const respuesta= await fetch("https://thesimpsonsapi.com/api/characters");

        const datosJSON=await respuesta.json();
        
        personajesGlobal= datosJSON.docs; 

        console.log("Personajes cargados:", personajesGlobal);
        

    } catch (error) {
        
        console.error("Hubo un problema al conectar con la API:", error);
    }
}
obtenerPersonajes();