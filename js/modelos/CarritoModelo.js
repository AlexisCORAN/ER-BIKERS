
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class CarritoModelo {

    constructor() {
        this.claveAlmacenamiento = 'erbikers_carrito';
    }

    listarSeleccionados() {
        const datosAlmacenados = localStorage.getItem(this.claveAlmacenamiento);

        if (datosAlmacenados) {
            const productosSeleccionados = JSON.parse(datosAlmacenados);

            return productosSeleccionados;
        }

        return [];
    }

    guardarSeleccion(productosSeleccionados) {
        const datosConvertidos = JSON.stringify(productosSeleccionados);

        localStorage.setItem(this.claveAlmacenamiento, datosConvertidos);
    }

    agregarProducto(producto) {
        const productosSeleccionados = this.listarSeleccionados();

        const productoExistente = productosSeleccionados.find(elemento => {
            return elemento.id === producto.id;
        });

        if (productoExistente) {
            productoExistente.cantidad += 1;

        } else {
            const nuevoProducto = {
                id: producto.id,
                nombre: producto.nombre,
                categoria: producto.categoria,
                precio: producto.precio,
                cantidad: 1
            };

            productosSeleccionados.push(nuevoProducto);
        }

        this.guardarSeleccion(productosSeleccionados);

        return productosSeleccionados;
    }

    modificarCantidad(codigo, variacion) {
        const productosSeleccionados = this.listarSeleccionados();

        const productosActualizados = productosSeleccionados.map(producto => {

            if (producto.id === codigo) {
                const productoModificado = {
                    ...producto,
                    cantidad: producto.cantidad + variacion
                };

                return productoModificado;
            }

            return producto;
        });

        const productosFiltrados = productosActualizados.filter(producto => {
            return producto.cantidad > 0;
        });

        this.guardarSeleccion(productosFiltrados);

        return productosFiltrados;
    }

    quitarProducto(codigo) {
        const productosSeleccionados = this.listarSeleccionados();

        const productosRestantes = productosSeleccionados.filter(producto => {
            return producto.id !== codigo;
        });

        this.guardarSeleccion(productosRestantes);

        return productosRestantes;
    }

    vaciarCarrito() {
        localStorage.removeItem(this.claveAlmacenamiento);

        return [];
    }

    calcularTotalUnidades() {
        const productosSeleccionados = this.listarSeleccionados();

        let totalUnidades = 0;

        for (const producto of productosSeleccionados) {
            totalUnidades += producto.cantidad;
        }

        return totalUnidades;
    }

    calcularImporteTotal() {
        const productosSeleccionados = this.listarSeleccionados();

        let importeTotal = 0;

        for (const producto of productosSeleccionados) {
            const subtotalProducto = producto.precio * producto.cantidad;

            importeTotal += subtotalProducto;
        }

        return importeTotal;
    }
}
