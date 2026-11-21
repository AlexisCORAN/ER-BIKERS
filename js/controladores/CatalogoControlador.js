
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class CatalogoControlador {

    constructor(navegacionVista) {
        this.catalogoModelo = new CatalogoModelo();
        this.carritoModelo = new CarritoModelo();

        this.catalogoVista = new CatalogoVista();
        this.carritoVista = new CarritoVista();

        this.navegacionVista = navegacionVista;

        this.categoriaActiva = 'Todos';
        this.terminoBusqueda = '';
    }

    iniciar() {
        if (!this.catalogoVista.contenedorCatalogo) {
            return;
        }

        this.actualizarVistaCatalogo();
        this.actualizarVistaCarrito();

        this.vincularEventos();
    }

    actualizarVistaCatalogo() {
        const productosFiltrados = this.catalogoModelo.filtrarProductos(
            this.categoriaActiva,
            this.terminoBusqueda
        );

        this.catalogoVista.dibujarCatalogo(productosFiltrados);

        this.catalogoVista.resaltarCategoriaActiva(this.categoriaActiva);
    }

    actualizarVistaCarrito() {
        const productosSeleccionados = this.carritoModelo.listarSeleccionados();

        const importeTotal = this.carritoModelo.calcularImporteTotal();

        const totalUnidades = this.carritoModelo.calcularTotalUnidades();

        this.carritoVista.dibujarResumenCarrito(
            productosSeleccionados,
            importeTotal
        );

        this.navegacionVista.actualizarIndicadorCarrito(totalUnidades);
    }

    vincularEventos() {

       
        this.catalogoVista.contenedorFiltros?.addEventListener('click', (evento) => {

            const elementoSeleccionado = evento.target;

            if (
                elementoSeleccionado.tagName === 'SPAN' &&
                elementoSeleccionado.dataset.categoria
            ) {
                this.categoriaActiva = elementoSeleccionado.dataset.categoria;

                this.actualizarVistaCatalogo();
            }
        });

        
        this.catalogoVista.campoBusqueda?.addEventListener('input', (evento) => {

            const textoIngresado = evento.target.value;

            this.terminoBusqueda = textoIngresado;

            this.actualizarVistaCatalogo();
        });

        this.catalogoVista.contenedorCatalogo.addEventListener('click', (evento) => {

            const botonAgregar = evento.target.closest('button[data-accion="agregar"]');

            if (!botonAgregar) {
                return;
            }

            const codigoProducto = botonAgregar.dataset.id;

            const productoEncontrado = this.catalogoModelo.buscarProductoPorCodigo(
                codigoProducto
            );

            if (productoEncontrado) {
                this.carritoModelo.agregarProducto(productoEncontrado);

                this.actualizarVistaCarrito();

                this.navegacionVista.mostrarNotificacion(
                    `"${productoEncontrado.nombre}" agregado al carrito.`
                );
            }
        });

        this.carritoVista.tablaCuerpo?.addEventListener('click', (evento) => {

            const botonAccion = evento.target.closest('button[data-accion]');

            if (!botonAccion) {
                return;
            }

            const accionSeleccionada = botonAccion.dataset.accion;
            const codigoProducto = botonAccion.dataset.id;

            if (accionSeleccionada === 'sumar') {
                this.carritoModelo.modificarCantidad(codigoProducto, 1);
            }

            if (accionSeleccionada === 'restar') {
                this.carritoModelo.modificarCantidad(codigoProducto, -1);
            }

            if (accionSeleccionada === 'eliminar') {
                this.carritoModelo.quitarProducto(codigoProducto);
            }

            this.actualizarVistaCarrito();
        });

        const botonVaciarCarrito = document.getElementById('btnVaciarCarrito');

        botonVaciarCarrito?.addEventListener('click', () => {

            this.carritoModelo.vaciarCarrito();

            this.actualizarVistaCarrito();

            this.navegacionVista.mostrarNotificacion('Carrito vaciado.');
        });
    }
}
