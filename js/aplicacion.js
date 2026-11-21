/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener('DOMContentLoaded', () => {
    const general = new GeneralControlador();
    general.iniciar();

    const catalogo = new CatalogoControlador(general.navegacionVista);
    catalogo.iniciar();

    const atencion = new AtencionControlador(general.navegacionVista);
    atencion.iniciar();
});