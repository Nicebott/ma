export class GestorIdioma {
  constructor() {
    this.idiomaActual = localStorage.getItem("idioma") || "es"
    this.traducciones = null
  }

  async cargarTraducciones() {
    try {
      const respuesta = await fetch("../datos/traducciones.json")
      this.traducciones = await respuesta.json()
      console.log("[v0] Traducciones cargadas")
    } catch (error) {
      console.error("[v0] Error al cargar traducciones:", error)
    }
  }

  obtenerIdioma() {
    return this.idiomaActual
  }

  cambiarIdioma(nuevoIdioma) {
    if (nuevoIdioma === this.idiomaActual) return

    this.idiomaActual = nuevoIdioma
    localStorage.setItem("idioma", nuevoIdioma)
    document.documentElement.lang = nuevoIdioma
    console.log(`[v0] Idioma cambiado a: ${nuevoIdioma}`)
  }

  alternarIdioma() {
    const nuevoIdioma = this.idiomaActual === "es" ? "en" : "es"
    this.cambiarIdioma(nuevoIdioma)
    return nuevoIdioma
  }

  t(clave) {
    if (!this.traducciones) return clave

    const claves = clave.split(".")
    let valor = this.traducciones[this.idiomaActual]

    for (const k of claves) {
      if (valor && valor[k] !== undefined) {
        valor = valor[k]
      } else {
        return clave
      }
    }

    return valor
  }
}
