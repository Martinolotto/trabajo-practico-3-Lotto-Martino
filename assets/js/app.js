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
                                data-id="${personaje.id}">
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

//logica de filtrado 
function filtrarPersonajes() {
    const textoBusqueda = inputBusqueda.value.trim().toLowerCase();

    // si el campo estavacío  se muestra todo el listado
    if (textoBusqueda === "") {
        renderizarTarjetas(personajesGlobal);
        return;
    }

    const personajesFiltrados = personajesGlobal.filter((personaje) => {
        return personaje.name.toLowerCase().includes(textoBusqueda);
    });

    renderizarTarjetas(personajesFiltrados);
}


// eventos del buscador 

// click
btnBuscar.addEventListener("click", filtrarPersonajes);

// buscar presionando enter
inputBusqueda.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        filtrarPersonajes();
    }
});

//=========

//funcion asincrona 
async function obtenerDetallePersonaje(idPersonaje) {
    try {
        const respuesta = await fetch(`${urlDetalle}${idPersonaje}`);
        const datosJSON = await respuesta.json();

        return datosJSON;

    } catch (error) {
        console.error("Error al obtener el detalle del personaje:", error);
    }
}

//mostrar modal
//recibe los datos de un personaje y los muestra dentro del modal

function mostrarModal(personaje) {

    // Referencias a los elementos del modal
    const modalTitulo = document.getElementById("modalDetalleLabel");
    const modalImagen = document.getElementById("modal-imagen");
    const modalEdad = document.getElementById("modal-edad");
    const modalNacimiento = document.getElementById("modal-nacimiento");
    const modalGenero = document.getElementById("modal-genero");
    const modalOcupacion = document.getElementById("modal-ocupacion");
    const modalEstado = document.getElementById("modal-estado");
    const modalFrase = document.getElementById("modal-frase");

    
    const urlImagen = `https://cdn.thesimpsonsapi.com/500${personaje.portrait_path}`;
    
    // rellenar elementos con los datos 
    modalTitulo.textContent = personaje.name;
    modalImagen.src = urlImagen;
    modalImagen.alt = personaje.name;
    modalEdad.textContent = personaje.age;
    modalNacimiento.textContent = personaje.birthdate;
    modalGenero.textContent = personaje.gender;
    modalOcupacion.textContent = personaje.occupation;
    modalEstado.textContent = personaje.status;

    if (personaje.phrases && personaje.phrases.length > 0) {
        modalFrase.textContent = `"${personaje.phrases[0]}"`;
    } else {
        modalFrase.textContent = "";
    }
    
    const modal = new bootstrap.Modal(document.getElementById("modalDetalle"));
    modal.show();
}

//evento click en ver detalle 
contenedorPersonajes.addEventListener("click", async (evento) => {

    if (evento.target.classList.contains("btn-detalle")) {

        // se lee el id del personaje de data id 
        const idPersonaje = evento.target.dataset.id;

        //pide datos a la api
        const personaje = await obtenerDetallePersonaje(idPersonaje);

        // si la respuest es valida se muestra el modal
        if (personaje) {
            mostrarModal(personaje);
        }
    }
});