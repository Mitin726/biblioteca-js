function procesarSolicitud(solicitud) {
  const nombreUsuario = solicitud.shift();

  solicitud.unshift("Carné de socio");
  solicitud.push(nombreUsuario);

  return solicitud;
}

const formulario = document.getElementById("formulario-solicitud");
const nombreUsuario = document.getElementById("nombre-usuario");
const libros = document.getElementById("libros");
const agregarLibro = document.getElementById("agregar-libro");
const resultadoSolicitud = document.getElementById("resultado-solicitud");

formulario.noValidate = true;

function crearCampoLibro() {
  const campo = document.createElement("div");
  campo.className = "libro-campo";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "titulosLibro";
  input.setAttribute("aria-label", "Título del libro adicional");
  input.placeholder = "Escribe el título del libro";

  const eliminar = document.createElement("button");
  eliminar.type = "button";
  eliminar.className = "boton-eliminar";
  eliminar.setAttribute("aria-label", "Eliminar este libro");
  eliminar.textContent = "🗑";
  eliminar.addEventListener("click", () => campo.remove());

  campo.append(input, eliminar);
  return campo;
}

agregarLibro.addEventListener("click", () => {
  const campo = crearCampoLibro();
  libros.appendChild(campo);
  campo.querySelector("input").focus();
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = nombreUsuario.value.trim();
  nombreUsuario.value = nombre;
  const titulos = [...libros.querySelectorAll("input")]
    .map((input) => input.value.trim())
    .filter(Boolean);

  if (!nombre || titulos.length === 0) {
    if (!nombre) {
      nombreUsuario.setAttribute("aria-invalid", "true");
    } else {
      nombreUsuario.removeAttribute("aria-invalid");
    }
    resultadoSolicitud.replaceChildren();

    const mensaje = document.createElement("p");
    mensaje.className = "mensaje-error";
    mensaje.textContent = !nombre
      ? "Ingresa tu nombre para procesar la solicitud."
      : "Escribe al menos un título de libro para procesar la solicitud.";
    resultadoSolicitud.append(mensaje);
    (!nombre ? nombreUsuario : libros.querySelector("input")).focus();
    return;
  }

  nombreUsuario.removeAttribute("aria-invalid");

  const solicitud = [nombre, ...titulos];
  const resultado = procesarSolicitud(solicitud);

  resultadoSolicitud.replaceChildren();

  const lista = document.createElement("div");
  lista.className = "resultado-grid";

  resultado.forEach((elemento, indice) => {
    const item = document.createElement("article");
    item.className = `resultado-item resultado-item-${indice}`;

    const etiqueta = document.createElement("span");
    etiqueta.className = "resultado-etiqueta";
    etiqueta.textContent = indice === 0
      ? "Identificación"
      : indice === resultado.length - 1
        ? "Usuario"
        : `Libro ${indice}`;

    const valor = document.createElement("strong");
    valor.textContent = elemento;

    item.append(etiqueta, valor);
    lista.appendChild(item);
  });

  resultadoSolicitud.appendChild(lista);

  const textoArray = document.createElement("p");
  textoArray.className = "resultado-array";
  textoArray.textContent = `Array procesado: [${resultado.map((elemento) => `"${elemento}"`).join(", ")}]`;
  resultadoSolicitud.appendChild(textoArray);
});