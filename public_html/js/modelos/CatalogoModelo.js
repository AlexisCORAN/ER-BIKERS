/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

class CatalogoModelo {

    constructor() {
        this.claveAlmacenamiento = 'erbikers_catalogo';

        this.productosBase = [
            { id: 'PRD-01', nombre: 'Casco Integral Storm', categoria: 'Cascos', precio: 349.00, imagen: 'imagenes/imagen01.jpg', alt: 'Casco Storm' },
            { id: 'PRD-02', nombre: 'Guantes de Cuero RoadGrip', categoria: 'Guantes', precio: 89.00, imagen: 'imagenes/imagen03.jpg', alt: 'Guantes RoadGrip' },
            { id: 'PRD-03', nombre: 'Manubrio TrackBar Aluminio', categoria: 'Accesorios', precio: 210.00, imagen: 'imagenes/imagen02.jpg', alt: 'Manubrio TrackBar' },
            { id: 'PRD-04', nombre: 'Casaca de Cuero Vintage Pro', categoria: 'Indumentaria', precio: 450.00, imagen: 'imagenes/imagen20.jpg', alt: 'Casaca Vintage' },
            { id: 'PRD-05', nombre: 'Intercomunicador Bluetooth V6', categoria: 'Accesorios', precio: 180.00, imagen: 'imagenes/imagen21.jpg', alt: 'Intercomunicador' },
            { id: 'PRD-06', nombre: 'Rodilleras Articuladas Titan', categoria: 'Indumentaria', precio: 120.00, imagen: 'imagenes/imagen24.jpg', alt: 'Rodilleras' },
            { id: 'PRD-07', nombre: 'Casco Abierto Urban City', categoria: 'Cascos', precio: 250.00, imagen: 'imagenes/imagen22.jpg', alt: 'Casco Abierto' },
            { id: 'PRD-08', nombre: 'Botas Touring Impermeables', categoria: 'Indumentaria', precio: 380.00, imagen: 'imagenes/imagen23.jpg', alt: 'Botas Touring' },
            { id: 'PRD-09', nombre: 'Candado con Alarma de Disco', categoria: 'Accesorios', precio: 95.00, imagen: 'imagenes/imagen09.jpg', alt: 'Candado Alarma' },
            { id: 'PRD-10', nombre: 'Soporte Celular + Cargador USB', categoria: 'Accesorios', precio: 65.00, imagen: 'imagenes/imagen10.jpg', alt: 'Soporte Celular' },
            { id: 'PRD-11', nombre: 'Guantes Térmicos de Invierno', categoria: 'Guantes', precio: 110.00, imagen: 'imagenes/imagen25.jpg', alt: 'Guantes Invierno' },
            { id: 'PRD-12', nombre: 'Funda Protectora Impermeable', categoria: 'Accesorios', precio: 75.00, imagen: 'imagenes/imagen11.jpg', alt: 'Funda Moto' },
            { id: 'PRD-13', nombre: 'Espejos Retrovisores Deportivos', categoria: 'Accesorios', precio: 85.00, imagen: 'imagenes/imagen16.jpg', alt: 'Espejos' },
            { id: 'PRD-14', nombre: 'Mochila Rígida Aerodinámica', categoria: 'Accesorios', precio: 190.00, imagen: 'imagenes/imagen12.jpg', alt: 'Mochila Rígida' },
            { id: 'PRD-15', nombre: 'Casco Modular Flip-Up PRO', categoria: 'Cascos', precio: 420.00, imagen: 'imagenes/imagen13.jpg', alt: 'Casco Modular' },
            { id: 'PRD-16', nombre: 'Protector de Tanque (Tank Pad)', categoria: 'Accesorios', precio: 35.00, imagen: 'imagenes/imagen14.jpg', alt: 'Tank Pad' },
            { id: 'PRD-17', nombre: 'Kit de Herramientas Portátil', categoria: 'Accesorios', precio: 55.00, imagen: 'imagenes/imagen17.jpg', alt: 'Kit Herramientas' },
            { id: 'PRD-18', nombre: 'Malla Pulpo para Carga Pesada', categoria: 'Accesorios', precio: 25.00, imagen: 'imagenes/imagen18.jpg', alt: 'Malla Pulpo' },
            { id: 'PRD-19', nombre: 'Lentes Goggles Motocross', categoria: 'Accesorios', precio: 90.00, imagen: 'imagenes/imagen15.jpg', alt: 'Lentes Motocross' },
            { id: 'PRD-20', nombre: 'Chaleco Reflectivo de Seguridad', categoria: 'Indumentaria', precio: 45.00, imagen: 'imagenes/imagen19.jpg', alt: 'Chaleco Reflectivo' }
        ];

        this.cargarInventarioInicial();
    }

    cargarInventarioInicial() {
        const datosAlmacenados = localStorage.getItem(this.claveAlmacenamiento);

        if (!datosAlmacenados) {
            const datosIniciales = JSON.stringify(this.productosBase);

            localStorage.setItem(this.claveAlmacenamiento, datosIniciales);
        }
    }

    listarProductos() {
        const datosAlmacenados = localStorage.getItem(this.claveAlmacenamiento);

        if (datosAlmacenados) {
            const productosAlmacenados = JSON.parse(datosAlmacenados);

            return productosAlmacenados;
        }

        return this.productosBase;
    }

    filtrarProductos(categoria = 'Todos', termino = '') {
        const productos = this.listarProductos();

        const terminoBusqueda = termino.trim().toLowerCase();

        const productosFiltrados = productos.filter(producto => {

            const coincideCategoria =
                categoria === 'Todos' || producto.categoria === categoria;

            const nombreNormalizado = producto.nombre.toLowerCase();
            const categoriaNormalizada = producto.categoria.toLowerCase();

            const coincideBusqueda =
                nombreNormalizado.includes(terminoBusqueda) ||
                categoriaNormalizada.includes(terminoBusqueda);

            return coincideCategoria && coincideBusqueda;
        });

        return productosFiltrados;
    }

    buscarProductoPorCodigo(codigo) {
        const productos = this.listarProductos();

        const productoEncontrado = productos.find(producto => {
            return producto.id === codigo;
        });

        return productoEncontrado || null;
    }
}