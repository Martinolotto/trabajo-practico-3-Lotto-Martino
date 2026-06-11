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

        renderizarTarjetas(personajesGlobal);
        
    } catch (error) {
        
        console.error("Hubo un problema al conectar con la API:", error);
    }
}
obtenerPersonajes();

// cargar personajes en el html
function renderizarTarjetas(arregloPersonajes) {
    contenedorPersonajes.innerHTML = '';
    if (arregloPersonajes.length === 0) {
        return;
    }
    arregloPersonajes.forEach(personaje => {
       
        const urlImagenCompleta = `https://cdn.thesimpsonsapi.com/500${personaje.image}`;

        //estructura de la tarjeta
        const tarjetaHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm border-warning">
                    <img src="${urlImagenCompleta}" class="card-img-top p-3" alt="${personaje.name}" style="height: 300px; object-fit: contain;">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title fw-bold">${personaje.name}</h5>
                        <p class="card-text mb-1"><strong>Ocupación:</strong> ${personaje.occupation}</p>
                        <p class="card-text mb-3"><strong>Estado:</strong> ${personaje.status}</p>
                        <button class="btn btn-warning mt-auto btn-detalle" data-id="${personaje._id}">Ver detalle</button>
                    </div>
                </div>
            </div>
        `;

        // se carga la tarjeta en el contenedor 
        contenedorPersonajes.innerHTML += tarjetaHTML;
    });
}