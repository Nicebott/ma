export class GestorDatos {
  constructor() {
    this.barrios = []
    this.rutas = []
    this.condiciones = []
  }

  async cargarDatos() {
    try {
      const [barriosRes, rutasRes, condicionesRes] = await Promise.all([
        fetch("datos/barrios.json"),
        fetch("datos/rutas.json"),
        fetch("datos/condiciones.json"),
      ])

      this.barrios = await barriosRes.json()
      this.rutas = await rutasRes.json()
      this.condiciones = await condicionesRes.json()

      console.log("[v0] Datos cargados:", {
        barrios: this.barrios.length,
        rutas: this.rutas.length,
        condiciones: this.condiciones.length,
      })
    } catch (error) {
      console.error("[v0] Error al cargar datos:", error)
      throw error
    }
  }

  obtenerBarrios() {
    return this.barrios
  }

  buscarBarrios(termino) {
    const terminoLower = termino.toLowerCase()
    return this.barrios.filter(
      (barrio) =>
        barrio.nombre.toLowerCase().includes(terminoLower) || barrio.sector.toLowerCase().includes(terminoLower),
    )
  }

  obtenerBarrioPorId(id) {
    return this.barrios.find((barrio) => barrio.id === id)
  }

  obtenerRutas() {
    return this.rutas
  }

  obtenerRutasPorOrigenDestino(origenId, destinoId) {
    return this.rutas.filter((ruta) => ruta.origen === origenId && ruta.destino === destinoId)
  }

  obtenerCondiciones() {
    return this.condiciones
  }

  actualizarCondicion(id, activa) {
    const condicion = this.condiciones.find((c) => c.id === id)
    if (condicion) {
      condicion.activa = activa
    }
  }

  obtenerCondicionesActivas() {
    return this.condiciones.filter((c) => c.activa)
  }
}
