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

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const solicitud = [
    nombreUsuario.value.trim(),
    tituloLibro1.value.trim(),
    tituloLibro2.value.trim()
  ];
  const resultado = procesarSolicitud(solicitud);

  resultadoSolicitud.replaceChildren();

  const lista = document.createElement("ul");
  resultado.forEach((elemento) => {
    const item = document.createElement("li");
    item.textContent = elemento;
    lista.appendChild(item);
  });

  resultadoSolicitud.appendChild(lista);
});