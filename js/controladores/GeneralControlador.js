
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class GeneralControlador {

    constructor() {
        this.carritoModelo = new CarritoModelo();
        this.navegacionVista = new NavegacionVista();
    }

    iniciar() {
        this.navegacionVista.habilitarMenuDesplegable();

        this.navegacionVista.marcarSeccionActual();

        const totalUnidades = this.carritoModelo.calcularTotalUnidades();

        this.navegacionVista.actualizarIndicadorCarrito(totalUnidades);
    }
}
