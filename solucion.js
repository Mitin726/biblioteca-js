function procesarSolicitud(solicitud) {
  // Sacamos el primer elemento, que es el nombre del usuario
  let nombreUsuario = solicitud.shift();

  // Agregamos el carné al inicio del arreglo
  solicitud.unshift("Carné de socio");

  // Agregamos el nombre del usuario al final
  solicitud.push(nombreUsuario);

  return solicitud;
}

let solicitud = [
  "María",
  "Cien años de soledad",
  "El principito"
];

let resultado = procesarSolicitud(solicitud);

console.log(resultado);