const urlGeneral = "https://thesimpsonsapi.com/api/characters";
const urlDetalle = "https://thesimpsonsapi.com/api/characters/";

//guardar personajes
let personajesGlobal = [];

const contenedorPersonajes = document.getElementById("contenedor-personajes");
const inputBusqueda = document.getElementById("input-busqueda");
const btnBuscar = document.getElementById("btn-buscar");
const mensajeError = document.getElementById("mensaje-error");

function limpiarResultados() {
  contenedorPersonajes.innerHTML = "";
  mensajeError.classList.add("d-none");
}

//cargae personajes en las cards
function renderizarTarjetas(arregloPersonajes) {
  limpiarResultados();

  if (arregloPersonajes.length === 0) {
    mensajeError.classList.remove("d-none");
    return;
  }

  arregloPersonajes.forEach((personaje) => {
   const urlImagen = `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;

    const tarjetaHTML = `
            <div class="col">
                <div class="card h-100 shadow-sm border-warning">
                    <img src="${urlImagen}"
                         class="card-img-top p-3"
                         alt="${personaje.name}"
                         style="height: 200px; object-fit: contain; background-color: #FFF9E6;">
                    <div class="card-body d-flex flex-column text-center">
                        <h5 class="card-title fw-bold">${personaje.name}</h5>
                        <p class="card-text mb-1">
                            <strong>Ocupación:</strong> ${personaje.occupation}
                        </p>
                        <p class="card-text mb-3">
                            <strong>Estado:</strong> ${personaje.status}
                        </p>
                        <button class="btn btn-warning mt-auto btn-detalle"
                                data-id="${personaje._id}">
                            Ver detalle
                        </button>
                    </div>
                </div>
            </div>
        `;

    contenedorPersonajes.innerHTML += tarjetaHTML;
  });
}

async function obtenerPersonajes() {
  try {
    const respuesta = await fetch(urlGeneral);
    const datosJSON = await respuesta.json();

   //devuelve un results
    personajesGlobal = datosJSON.results || [];

    renderizarTarjetas(personajesGlobal);
  } catch (error) {
    console.error("Error al conectar con la API:", error);
  }
}

obtenerPersonajes();
