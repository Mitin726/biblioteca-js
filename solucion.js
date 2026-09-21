function procesarSolicitud(solicitud) {
  // Sacamos el primer elemento, que es el nombre del usuario
  const nombreUsuario = solicitud.shift();

  // Agregamos el carné al inicio del arreglo
  solicitud.unshift("Carné de socio");

  // Agregamos el nombre del usuario al final
  solicitud.push(nombreUsuario);

  return solicitud;
}

const formulario = document.getElementById("formulario-solicitud");
const nombreUsuario = document.getElementById("nombre-usuario");
const tituloLibro1 = document.getElementById("titulo-libro-1");
const tituloLibro2 = document.getElementById("titulo-libro-2");
const resultadoSolicitud = document.getElementById("resultado-solicitud");

formulario.noValidate = true;

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = nombreUsuario.value.trim();
  nombreUsuario.value = nombre;

  if (!nombre) {
    nombreUsuario.setAttribute("aria-invalid", "true");
    resultadoSolicitud.replaceChildren();

    const mensaje = document.createElement("p");
    mensaje.className = "mensaje-error";
    mensaje.textContent = "Ingresa tu nombre para procesar la solicitud.";
    resultadoSolicitud.appendChild(mensaje);
    nombreUsuario.focus();
    return;
  }

  nombreUsuario.removeAttribute("aria-invalid");

  const solicitud = [
    nombre,
    tituloLibro1.value.trim(),
    tituloLibro2.value.trim()
  ];
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
});