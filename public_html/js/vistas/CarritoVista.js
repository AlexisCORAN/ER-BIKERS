
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class CarritoVista {

    constructor() {
        this.tablaCuerpo = document.getElementById('cuerpoCarrito');
        this.etiquetaTotal = document.getElementById('totalCarrito');
    }

    dibujarResumenCarrito(productosSeleccionados, importeTotal) {
        if (!this.tablaCuerpo || !this.etiquetaTotal) {
            return;
        }

        if (productosSeleccionados.length === 0) {

            this.tablaCuerpo.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; color: #9aa1a9; padding: 24px;">
                        Tu carrito está vacío. Agrega productos desde el catálogo superior.
                    </td>
                </tr>
            `;

            this.etiquetaTotal.textContent = 'S/ 0.00';

            return;
        }

        const filasProductos = productosSeleccionados.map(producto => {

            const subtotalProducto = producto.precio * producto.cantidad;

            return `
                <tr>
                    <td><strong>${producto.nombre}</strong></td>
                    <td>${producto.categoria}</td>
                    <td>S/ ${producto.precio.toFixed(2)}</td>
                    <td>
                        <div class="controles-cantidad">
                            <button type="button" class="btn-cantidad" data-accion="restar" data-id="${producto.id}">-</button>
                            <span>${producto.cantidad}</span>
                            <button type="button" class="btn-cantidad" data-accion="sumar" data-id="${producto.id}">+</button>
                        </div>
                    </td>
                    <td><strong>S/ ${subtotalProducto.toFixed(2)}</strong></td>
                    <td>
                        <button type="button" class="btn-quitar" data-accion="eliminar" data-id="${producto.id}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

        this.tablaCuerpo.innerHTML = filasProductos.join('');

        this.etiquetaTotal.textContent = `S/ ${importeTotal.toFixed(2)}`;
    }
}
