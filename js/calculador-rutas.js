export class CalculadorRutas {
  calcularRuta(ruta, condicionesActivas) {
    let tiempoBase = 0
    let costoBase = 0
    const transbordos = ruta.tramos.length - 1

    ruta.tramos.forEach((tramo) => {
      tiempoBase += tramo.tiempo_min
      costoBase += tramo.costo
    })

    let tiempoTotal = tiempoBase
    let costoTotal = costoBase

    condicionesActivas.forEach((condicion) => {
      tiempoTotal = tiempoTotal * (1 + condicion.tiempo_pct / 100)
      costoTotal += condicion.costo_extra
    })

    tiempoTotal = Math.round(tiempoTotal)

    return {
      ...ruta,
      tiempoBase,
      tiempoTotal,
      costoBase,
      costoTotal,
      transbordos,
      condicionesAplicadas: condicionesActivas.map((c) => c.nombre),
    }
  }

  calcularRutas(rutas, condicionesActivas) {
    return rutas.map((ruta) => this.calcularRuta(ruta, condicionesActivas))
  }

  ordenarRutas(rutas, criterio) {
    const rutasOrdenadas = [...rutas]

    switch (criterio) {
      case "tiempo":
        rutasOrdenadas.sort((a, b) => a.tiempoTotal - b.tiempoTotal)
        break
      case "costo":
        rutasOrdenadas.sort((a, b) => a.costoTotal - b.costoTotal)
        break
      case "transbordos":
        rutasOrdenadas.sort((a, b) => a.transbordos - b.transbordos)
        break
      default:
        rutasOrdenadas.sort((a, b) => a.tiempoTotal - b.tiempoTotal)
    }

    return rutasOrdenadas
  }
}
