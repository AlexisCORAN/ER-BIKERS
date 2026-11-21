
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class AtencionControlador {

    constructor(navegacionVista) {
        this.atencionModelo = new AtencionModelo();
        this.carritoModelo = new CarritoModelo();

        this.atencionVista = new AtencionVista();
        this.navegacionVista = navegacionVista;
    }

    iniciar() {
        this.atencionVista.configurarAcordeonPreguntas();

        const productosSeleccionados = this.carritoModelo.listarSeleccionados();

        this.atencionVista.cargarDatosDesdeEnlace(productosSeleccionados);

        const ultimaReclamacion = this.atencionModelo.consultarUltimaReclamacion();

        if (ultimaReclamacion) {
            this.atencionVista.mostrarConstanciaReclamacion(ultimaReclamacion);
        }

        this.vincularFormularios();
    }

    vincularFormularios() {

        const formularioConsultas = document.getElementById('formSugerencias');

        formularioConsultas?.addEventListener('submit', (evento) => {

            evento.preventDefault();

            const datosConsulta = {
                nombre: document.getElementById('sugerenciaNombre').value.trim(),
                email: document.getElementById('sugerenciaCorreo').value.trim(),
                telefono: document.getElementById('sugerenciaTelefono').value.trim(),
                mensaje: document.getElementById('sugerenciaMensaje').value.trim()
            };

            const consultaRegistrada = this.atencionModelo.guardarConsulta(datosConsulta);

            this.atencionVista.mostrarConstanciaConsulta(consultaRegistrada);

            this.navegacionVista.mostrarNotificacion(
                `Consulta registrada (${consultaRegistrada.codigo}).`
            );

            formularioConsultas.reset();
        });

        const formularioReclamaciones = document.getElementById('formReclamaciones');

        formularioReclamaciones?.addEventListener('submit', (evento) => {

            evento.preventDefault();

            const datosReclamacion = {
                nombre: document.getElementById('reclamacionNombre').value.trim(),
                documento: document.getElementById('reclamacionDocumento').value.trim(),
                domicilio: document.getElementById('reclamacionDomicilio').value.trim(),
                telefono: document.getElementById('reclamacionTelefono').value.trim(),
                correo: document.getElementById('reclamacionCorreo').value.trim(),
                tipoBien: document.getElementById('reclamacionTipoBien').value,
                monto: document.getElementById('reclamacionMonto').value,
                descripcion: document.getElementById('reclamacionDescripcion').value.trim(),
                tipo: document.getElementById('reclamacionTipo').value,
                detalle: document.getElementById('reclamacionDetalle').value.trim(),
                pedido: document.getElementById('reclamacionPedido').value.trim()
            };

            const reclamacionRegistrada = this.atencionModelo.guardarReclamacion(datosReclamacion);

            this.atencionVista.mostrarConstanciaReclamacion(reclamacionRegistrada);

            this.navegacionVista.mostrarNotificacion(
                `Hoja de reclamación ${reclamacionRegistrada.codigo} registrada.`
            );

            formularioReclamaciones.reset();
        });
    }
}
