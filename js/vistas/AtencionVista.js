
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class AtencionVista {

    cargarDatosDesdeEnlace(productosCarrito = []) {
        const parametrosURL = new URLSearchParams(window.location.search);

        const campoMensaje = document.getElementById('sugerenciaMensaje');

        if (!campoMensaje) {
            return;
        }

        const nombreProducto = parametrosURL.get('producto');
        const precioProducto = parametrosURL.get('precio');
        const origenConsulta = parametrosURL.get('origen');

        if (nombreProducto) {
            campoMensaje.value =
                    `Hola ER Bikers, deseo consultar disponibilidad y envío para: ${nombreProducto} (Precio ref. S/ ${precioProducto}).`;

        } else if (origenConsulta === 'carrito' && productosCarrito.length > 0) {

            const resumenPedido = productosCarrito.map(producto => {

                const subtotalProducto = producto.precio * producto.cantidad;

                return `- ${producto.cantidad}x ${producto.nombre} (S/ ${subtotalProducto.toFixed(2)})`;

            }).join('\n');

            campoMensaje.value =
                    `Hola ER Bikers, solicito cotización y envío para los siguientes productos:\n${resumenPedido}`;
    }
    }

    mostrarConstanciaConsulta(consultaRegistrada) {
        const contenedorResultado = document.getElementById('resultadoSugerencias');

        if (!contenedorResultado) {
            return;
        }

        contenedorResultado.classList.remove('oculto');

        contenedorResultado.innerHTML = `
            <h4>Consulta registrada correctamente</h4>
            <p>Gracias, <strong>${consultaRegistrada.nombre}</strong>. Tu mensaje ha sido guardado.</p>
            <span class="codigo-registro">Código: ${consultaRegistrada.codigo} | ${consultaRegistrada.fecha}</span>
        `;
    }

    mostrarConstanciaReclamacion(reclamacionRegistrada) {
        const contenedorResultado = document.getElementById('resultadoReclamaciones');

        if (!contenedorResultado) {
            return;
        }

        const tipoReclamacion = reclamacionRegistrada.tipo.toUpperCase();

        const tipoBien = reclamacionRegistrada.tipoBien.toUpperCase();

        const montoReclamacion = Number(reclamacionRegistrada.monto).toFixed(2);

        contenedorResultado.classList.remove('oculto');

        contenedorResultado.innerHTML = `
            <h4>Hoja de Reclamación Registrada</h4>
            <p>Consumidor: <strong>${reclamacionRegistrada.nombre}</strong> (DNI/CE: ${reclamacionRegistrada.documento})</p>
            <p>Tipo: <strong>${tipoReclamacion}</strong> sobre <strong>${tipoBien}</strong> (S/ ${montoReclamacion})</p>
            <span class="codigo-registro">N° Hoja: ${reclamacionRegistrada.codigo} | ${reclamacionRegistrada.fecha}</span>
            <p class="nota-formulario" style="margin-top: 8px;">Constancia guardada. Plazo máximo de respuesta: 15 días hábiles.</p>
        `;
    }

    configurarAcordeonPreguntas() {
        const contenedor = document.querySelector('.acordeon-preguntas');
        if (!contenedor)
            return;

        contenedor.addEventListener('click', (evento) => {
            const resumenClicado = evento.target.closest('summary');
            if (!resumenClicado)
                return;

            const preguntaClicada = resumenClicado.parentElement;

            const preguntaAbierta = contenedor.querySelector('.pregunta-item[open]');

            if (preguntaAbierta && preguntaAbierta !== preguntaClicada) {
                preguntaAbierta.open = false;
            }
        });
    }
}
