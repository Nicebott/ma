export class GestorTema {
  constructor() {
    this.temaActual = localStorage.getItem("tema") || "claro"
    this.aplicarTema()
  }

  aplicarTema() {
    if (this.temaActual === "oscuro") {
      document.body.classList.add("modo-oscuro")
    } else {
      document.body.classList.remove("modo-oscuro")
    }
  }

  obtenerTema() {
    return this.temaActual
  }

  cambiarTema(nuevoTema) {
    this.temaActual = nuevoTema
    localStorage.setItem("tema", nuevoTema)
    this.aplicarTema()
    console.log(`[v0] Tema cambiado a: ${nuevoTema}`)
  }

  alternarTema() {
    const nuevoTema = this.temaActual === "claro" ? "oscuro" : "claro"
    this.cambiarTema(nuevoTema)
    return nuevoTema
  }
}
