
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class CatalogoVista {

    constructor() {
        this.contenedorCatalogo = document.getElementById('listaProductos');
        this.contenedorFiltros = document.getElementById('barraFiltros');
        this.campoBusqueda = document.getElementById('buscadorProductos');
    }

    dibujarCatalogo(productosDisponibles) {
        if (!this.contenedorCatalogo) {
            return;
        }

        if (productosDisponibles.length === 0) {

            this.contenedorCatalogo.innerHTML = `
                <p class="bajada-bloque">No se encontraron productos con ese criterio de búsqueda.</p>
            `;

            return;
        }

        const tarjetasProductos = productosDisponibles.map(producto => {

            const precioProducto = producto.precio.toFixed(2);

            const nombreCodificado = encodeURIComponent(producto.nombre);

            return `
                <article class="producto">
                    <div class="producto-foto">
                        <img src="${producto.imagen}" alt="${producto.alt}" loading="lazy">
                    </div>

                    <div class="producto-detalle">
                        <span class="categoria-producto">${producto.categoria}</span>

                        <h3>${producto.nombre}</h3>

                        <p class="precio-producto">S/ ${precioProducto}</p>

                        <div class="acciones-producto">
                            <button type="button" class="btn btn-primario btn-agregar" data-accion="agregar" data-id="${producto.id}">
                                Añadir al carrito
                            </button>

                            <a href="contacto.html?producto=${nombreCodificado}&precio=${precioProducto}#sugerencias"
                               class="btn btn-borde btn-chico">
                                Consultar stock
                            </a>
                        </div>
                    </div>
                </article>
            `;
        });

        this.contenedorCatalogo.innerHTML = tarjetasProductos.join('');
    }

    resaltarCategoriaActiva(categoriaSeleccionada) {
        if (!this.contenedorFiltros) {
            return;
        }

        const etiquetasCategoria = this.contenedorFiltros.querySelectorAll('span');

        etiquetasCategoria.forEach(etiquetaCategoria => {

            const coincideCategoria =
                etiquetaCategoria.dataset.categoria === categoriaSeleccionada;

            etiquetaCategoria.classList.toggle('filtro-activo', coincideCategoria);
        });
    }
}
