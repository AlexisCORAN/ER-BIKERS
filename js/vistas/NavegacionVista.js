/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
class NavegacionVista {
    constructor() {
        this.botonMenu = document.getElementById('btnMenu');
        this.barraNavegacion = document.getElementById('navPrincipal');
        this.indicadorCarrito = document.getElementById('contadorCarrito');
    }

    habilitarMenuDesplegable() {
        if (!this.botonMenu || !this.barraNavegacion) return;

        this.botonMenu.addEventListener('click', () => {
            const desplegado = this.barraNavegacion.classList.toggle('abierto');
            this.botonMenu.classList.toggle('activo', desplegado);
            this.botonMenu.setAttribute('aria-expanded', String(desplegado));
        });

        this.barraNavegacion.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                this.barraNavegacion.classList.remove('abierto');
                this.botonMenu.classList.remove('activo');
                this.botonMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }

    marcarSeccionActual() {
        if (!this.barraNavegacion) return;
        const paginaActual = window.location.pathname.split('/').pop() || 'index.html';

        this.barraNavegacion.querySelectorAll('a:not(.enlace-carrito)').forEach(enlace => {
            if (enlace.getAttribute('href') === paginaActual) {
                enlace.classList.add('activo');
            }
        });
    }

    actualizarIndicadorCarrito(unidades) {
        if (this.indicadorCarrito) {
            this.indicadorCarrito.textContent = unidades;
        }
    }

    mostrarNotificacion(texto) {
        const avisoAnterior = document.querySelector('.aviso-flotante');
        if (avisoAnterior) avisoAnterior.remove();

        const cuadroAviso = document.createElement('div');
        cuadroAviso.className = 'aviso-flotante';
        cuadroAviso.textContent = texto;
        document.body.appendChild(cuadroAviso);

        setTimeout(() => cuadroAviso.remove(), 3000);
    }
}

