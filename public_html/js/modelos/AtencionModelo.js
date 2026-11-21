
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class AtencionModelo {

    constructor() {
        this.claveConsultas = 'erbikers_consultas';
        this.claveReclamaciones = 'erbikers_reclamaciones';
    }

    guardarConsulta(datos) {
        const datosAlmacenados = localStorage.getItem(this.claveConsultas);

        const historialConsultas = JSON.parse(datosAlmacenados) || [];

        const codigoConsulta = Date.now().toString().slice(-6);

        const fechaRegistro = new Date().toLocaleString('es-PE');

        const nuevaConsulta = {
            codigo: `SUG-${codigoConsulta}`,
            fecha: fechaRegistro,
            ...datos
        };

        historialConsultas.push(nuevaConsulta);

        const consultasConvertidas = JSON.stringify(historialConsultas);

        localStorage.setItem(this.claveConsultas, consultasConvertidas);

        return nuevaConsulta;
    }

    guardarReclamacion(datos) {
        const datosAlmacenados = localStorage.getItem(this.claveReclamaciones);

        const historialReclamaciones = JSON.parse(datosAlmacenados) || [];

        const numeroCorrelativo = historialReclamaciones.length + 1;

        let codigoCorrelativo = String(numeroCorrelativo);

        if (numeroCorrelativo < 10) {
            codigoCorrelativo = '000' + codigoCorrelativo;
        } else if (numeroCorrelativo < 100) {
            codigoCorrelativo = '00' + codigoCorrelativo;
        } else if (numeroCorrelativo < 1000) {
            codigoCorrelativo = '0' + codigoCorrelativo;
        }

        const fechaRegistro = new Date().toLocaleString('es-PE');

        const nuevaReclamacion = {
            codigo: `LR-2026-${codigoCorrelativo}`,
            fecha: fechaRegistro,
            ...datos
        };

        historialReclamaciones.push(nuevaReclamacion);

        const reclamacionesConvertidas = JSON.stringify(historialReclamaciones);

        localStorage.setItem(this.claveReclamaciones, reclamacionesConvertidas);

        return nuevaReclamacion;
    }

    consultarUltimaReclamacion() {
        const datosAlmacenados = localStorage.getItem(this.claveReclamaciones);

        const historialReclamaciones = JSON.parse(datosAlmacenados) || [];

        if (historialReclamaciones.length > 0) {
            const ultimaPosicion = historialReclamaciones.length - 1;

            const ultimaReclamacion = historialReclamaciones[ultimaPosicion];

            return ultimaReclamacion;
        }

        return null;
    }
}
