import { debounce } from "./utilidades.js"

export class InterfazUsuario {
  constructor(gestorDatos, calculadorRutas, gestorFavoritos) {
    this.gestorDatos = gestorDatos
    this.calculadorRutas = calculadorRutas
    this.gestorFavoritos = gestorFavoritos

    this.elementos = {
      formulario: document.getElementById("formulario-busqueda"),
      inputOrigen: document.getElementById("origen"),
      inputDestino: document.getElementById("destino"),
      sugerenciasOrigen: document.getElementById("origen-sugerencias"),
      sugerenciasDestino: document.getElementById("destino-sugerencias"),
      listaAlertas: document.getElementById("lista-alertas"),
      listaResultados: document.getElementById("lista-resultados"),
      mensajeVacio: document.getElementById("mensaje-vacio"),
      botonFavoritos: document.getElementById("boton-favoritos"),
      seccionFavoritos: document.getElementById("seccion-favoritos"),
      listaFavoritos: document.getElementById("lista-favoritos"),
      favoritosVacio: document.getElementById("favoritos-vacio"),
      cerrarFavoritos: document.getElementById("cerrar-favoritos"),
      botonMapa: document.getElementById("boton-mapa"),
      botonModoOscuro: document.getElementById("boton-modo-oscuro"),
    }

    this.origenSeleccionado = null
    this.destinoSeleccionado = null
  }

  inicializar() {
    this.configurarEventos()
    this.renderizarAlertas()
    console.log("[v0] Interfaz de usuario inicializada")
  }

  configurarEventos() {
    this.elementos.formulario.addEventListener("submit", (e) => {
      e.preventDefault()
      this.buscarRutas()
    })

    const busquedaOrigenDebounced = debounce((termino) => {
      this.mostrarSugerencias(termino, "origen")
    }, 300)

    const busquedaDestinoDebounced = debounce((termino) => {
      this.mostrarSugerencias(termino, "destino")
    }, 300)

    this.elementos.inputOrigen.addEventListener("input", (e) => {
      busquedaOrigenDebounced(e.target.value)
    })

    this.elementos.inputDestino.addEventListener("input", (e) => {
      busquedaDestinoDebounced(e.target.value)
    })

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".formulario__grupo")) {
        this.ocultarSugerencias()
      }
    })

    this.elementos.botonFavoritos.addEventListener("click", () => {
      this.mostrarFavoritos()
    })

    this.elementos.cerrarFavoritos.addEventListener("click", () => {
      this.ocultarFavoritos()
    })

    this.elementos.botonMapa.addEventListener("click", () => {
      alert("Funcionalidad de mapa no implementada")
    })

    this.elementos.botonModoOscuro.addEventListener("click", () => {
      alert("Funcionalidad de modo oscuro no implementada")
    })

    const radios = document.querySelectorAll('input[name="ordenar"]')
    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (this.ultimasRutas) {
          this.renderizarResultados(this.ultimasRutas)
        }
      })
    })
  }

  mostrarSugerencias(termino, tipo) {
    if (termino.length < 2) {
      this.ocultarSugerencias(tipo)
      return
    }

    const barrios = this.gestorDatos.buscarBarrios(termino)
    const contenedor = tipo === "origen" ? this.elementos.sugerenciasOrigen : this.elementos.sugerenciasDestino

    if (barrios.length === 0) {
      this.ocultarSugerencias(tipo)
      return
    }

    contenedor.innerHTML = barrios
      .map(
        (barrio) => `
            <li class="sugerencias__item" data-id="${barrio.id}" role="option">
                <strong>${barrio.nombre}</strong>
                <br>
                <small style="color: var(--color-texto-terciario);">${barrio.sector}</small>
            </li>
        `,
      )
      .join("")

    contenedor.classList.add("sugerencias--visible")

    contenedor.querySelectorAll(".sugerencias__item").forEach((item) => {
      item.addEventListener("click", () => {
        this.seleccionarBarrio(item.dataset.id, tipo)
      })
    })
  }

  ocultarSugerencias(tipo = null) {
    if (tipo === "origen" || tipo === null) {
      this.elementos.sugerenciasOrigen.classList.remove("sugerencias--visible")
    }
    if (tipo === "destino" || tipo === null) {
      this.elementos.sugerenciasDestino.classList.remove("sugerencias--visible")
    }
  }

  seleccionarBarrio(barrioId, tipo) {
    const barrio = this.gestorDatos.obtenerBarrioPorId(barrioId)
    if (!barrio) return

    if (tipo === "origen") {
      this.origenSeleccionado = barrio
      this.elementos.inputOrigen.value = barrio.nombre
      this.ocultarSugerencias("origen")
    } else {
      this.destinoSeleccionado = barrio
      this.elementos.inputDestino.value = barrio.nombre
      this.ocultarSugerencias("destino")
    }
  }

  renderizarAlertas() {
    const condiciones = this.gestorDatos.obtenerCondiciones()

    this.elementos.listaAlertas.innerHTML = condiciones
      .map(
        (condicion) => `
            <div class="alerta alerta--${condicion.tipo}">
                <div class="alerta__contenido">
                    <h4 class="alerta__titulo">${condicion.nombre}</h4>
                    <p class="alerta__descripcion">${condicion.descripcion}</p>
                    <p class="alerta__descripcion">
                        <small>Impacto: +${condicion.tiempo_pct}% tiempo, +RD$${condicion.costo_extra} costo</small>
                    </p>
                </div>
                <div class="alerta__toggle">
                    <input 
                        type="checkbox" 
                        class="alerta__checkbox" 
                        id="condicion-${condicion.id}"
                        ${condicion.activa ? "checked" : ""}
                        data-id="${condicion.id}"
                    >
                </div>
            </div>
        `,
      )
      .join("")

    this.elementos.listaAlertas.querySelectorAll(".alerta__checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        this.gestorDatos.actualizarCondicion(e.target.dataset.id, e.target.checked)
        if (this.ultimasRutas) {
          this.buscarRutas()
        }
      })
    })
  }

  buscarRutas() {
    if (!this.origenSeleccionado || !this.destinoSeleccionado) {
      alert("Por favor selecciona origen y destino de las sugerencias")
      return
    }

    if (this.origenSeleccionado.id === this.destinoSeleccionado.id) {
      alert("El origen y destino no pueden ser el mismo")
      return
    }

    const rutas = this.gestorDatos.obtenerRutasPorOrigenDestino(this.origenSeleccionado.id, this.destinoSeleccionado.id)

    if (rutas.length === 0) {
      this.elementos.mensajeVacio.innerHTML = `
                <p>No se encontraron rutas entre ${this.origenSeleccionado.nombre} y ${this.destinoSeleccionado.nombre}</p>
            `
      this.elementos.mensajeVacio.style.display = "block"
      this.elementos.listaResultados.innerHTML = ""
      return
    }

    const condicionesActivas = this.gestorDatos.obtenerCondicionesActivas()
    const rutasCalculadas = this.calculadorRutas.calcularRutas(rutas, condicionesActivas)

    this.ultimasRutas = rutasCalculadas
    this.renderizarResultados(rutasCalculadas)
  }

  renderizarResultados(rutas) {
    const criterio = document.querySelector('input[name="ordenar"]:checked').value
    const rutasOrdenadas = this.calculadorRutas.ordenarRutas(rutas, criterio)

    this.elementos.mensajeVacio.style.display = "none"

    this.elementos.listaResultados.innerHTML = rutasOrdenadas
      .map((ruta) => {
        const esFavorito = this.gestorFavoritos.esFavorito(ruta.id)
        return this.crearTarjetaRuta(ruta, esFavorito)
      })
      .join("")

    this.elementos.listaResultados.querySelectorAll(".tarjeta-ruta__favorito").forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const rutaId = e.target.dataset.rutaId
        this.toggleFavorito(rutaId)
      })
    })
  }

  crearTarjetaRuta(ruta, esFavorito) {
    const tipoTexto = ruta.tipo.replace("-", " ").toUpperCase()

    return `
            <article class="tarjeta-ruta">
                <div class="tarjeta-ruta__encabezado">
                    <span class="tarjeta-ruta__tipo tarjeta-ruta__tipo--${ruta.tipo}">
                        ${tipoTexto}
                    </span>
                    <button 
                        class="tarjeta-ruta__favorito" 
                        data-ruta-id="${ruta.id}"
                        aria-label="${esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}"
                    >
                        ${esFavorito ? "★" : "☆"}
                    </button>
                </div>
                
                <div class="tarjeta-ruta__info">
                    <div class="tarjeta-ruta__dato">
                        <span class="tarjeta-ruta__etiqueta">Tiempo</span>
                        <span class="tarjeta-ruta__valor">${ruta.tiempoTotal} min</span>
                    </div>
                    <div class="tarjeta-ruta__dato">
                        <span class="tarjeta-ruta__etiqueta">Costo</span>
                        <span class="tarjeta-ruta__valor">RD$${ruta.costoTotal}</span>
                    </div>
                    <div class="tarjeta-ruta__dato">
                        <span class="tarjeta-ruta__etiqueta">Transbordos</span>
                        <span class="tarjeta-ruta__valor">${ruta.transbordos}</span>
                    </div>
                </div>

                ${
                  ruta.condicionesAplicadas.length > 0
                    ? `
                    <div style="margin-bottom: var(--espaciado-md);">
                        <small style="color: var(--color-texto-terciario);">
                            Condiciones aplicadas: ${ruta.condicionesAplicadas.join(", ")}
                        </small>
                    </div>
                `
                    : ""
                }

                <div class="tarjeta-ruta__tramos">
                    <h4 class="tarjeta-ruta__tramos-titulo">Detalles del recorrido</h4>
                    <div class="tarjeta-ruta__tramos-lista">
                        ${ruta.tramos
                          .map(
                            (tramo) => `
                            <div class="tramo">
                                ${tramo.descripcion} (${tramo.tiempo_min} min, RD$${tramo.costo})
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </article>
        `
  }

  toggleFavorito(rutaId) {
    const ruta = this.ultimasRutas.find((r) => r.id === rutaId)
    if (!ruta) return

    const esFavorito = this.gestorFavoritos.esFavorito(rutaId)

    if (esFavorito) {
      this.gestorFavoritos.eliminarFavorito(rutaId)
    } else {
      this.gestorFavoritos.guardarFavorito(ruta)
    }

    this.renderizarResultados(this.ultimasRutas)
  }

  mostrarFavoritos() {
    const favoritos = this.gestorFavoritos.obtenerFavoritos()

    if (favoritos.length === 0) {
      this.elementos.favoritosVacio.style.display = "block"
      this.elementos.listaFavoritos.innerHTML = ""
    } else {
      this.elementos.favoritosVacio.style.display = "none"

      const condicionesActivas = this.gestorDatos.obtenerCondicionesActivas()
      const favoritosCalculados = this.calculadorRutas.calcularRutas(favoritos, condicionesActivas)

      this.elementos.listaFavoritos.innerHTML = favoritosCalculados
        .map((ruta) => {
          const origen = this.gestorDatos.obtenerBarrioPorId(ruta.origen)
          const destino = this.gestorDatos.obtenerBarrioPorId(ruta.destino)

          return `
                    <div style="margin-bottom: var(--espaciado-md);">
                        <p style="font-size: 0.875rem; color: var(--color-texto-secundario); margin-bottom: var(--espaciado-sm);">
                            <strong>${origen?.nombre || "Desconocido"}</strong> → <strong>${destino?.nombre || "Desconocido"}</strong>
                        </p>
                        ${this.crearTarjetaRuta(ruta, true)}
                    </div>
                `
        })
        .join("")

      this.elementos.listaFavoritos.querySelectorAll(".tarjeta-ruta__favorito").forEach((boton) => {
        boton.addEventListener("click", (e) => {
          const rutaId = e.target.dataset.rutaId
          this.gestorFavoritos.eliminarFavorito(rutaId)
          this.mostrarFavoritos()
        })
      })
    }

    this.elementos.seccionFavoritos.classList.remove("oculto")
    document.getElementById("seccion-resultados").classList.add("oculto")
  }

  ocultarFavoritos() {
    this.elementos.seccionFavoritos.classList.add("oculto")
    document.getElementById("seccion-resultados").classList.remove("oculto")
  }
}
