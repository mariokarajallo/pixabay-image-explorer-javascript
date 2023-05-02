const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
let registroPorPagina = 40;
let totalPaginas;
let iterador;

window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector("#termino").value;

  if (terminoBusqueda === "") {
    mostrarAlerta("Agrega un termino de busqueda");
    return;
  }

  buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector(".error");

  if (!existeAlerta) {
    const alerta = document.createElement("P");
    alerta.classList.add(
      "error",
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
<strong class="font-bold">Error!      </strong>
<span class="block sm:inline">${mensaje}</span>
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes(termino) {
  const key = "8722925-77095ecbf430e624a938ffd7d";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      totalPaginas = calcularPaginas(result.totalHits);
      mostrarImagenes(result.hits);
    });
}

// generador que registrara la cantidad de elementos segun el total de paginas

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registroPorPagina));
}

function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}
function mostrarImagenes(imagenes) {
  // limpiar el html de resultados previos
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  // iterar sobre el arreglo de imagenes y construir el HTML
  imagenes.forEach((imagen) => {
    const { previewURL, likes, views, largeImageURL } = imagen;
    resultado.innerHTML += `
      <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-white">
          <img src=${previewURL} alt="imagen previa" class="w-full">    </img>
          <div class="p-4">
            <p class="font-bold">${likes}<span class="font-light"> Me gusta</span></p>
            <p class="font-bold">${views}<span class="font-light"> Veces vista</span></p>
            <a href=${largeImageURL} class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" target="_blank" rel="noopener noreferrer"
            >
              Ver Imagen
            </a>
          </div>

        </div>  
      </div>
    `;
  });

  iterador = crearPaginador(totalPaginas);
}
