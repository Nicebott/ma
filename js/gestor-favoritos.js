export class GestorFavoritos {
  constructor() {
    this.claveFavoritos = "guaguatime-favoritos"
  }

  obtenerFavoritos() {
    try {
      const favoritos = localStorage.getItem(this.claveFavoritos)
      return favoritos ? JSON.parse(favoritos) : []
    } catch (error) {
      console.error("[v0] Error al obtener favoritos:", error)
      return []
    }
  }

  guardarFavorito(ruta) {
    try {
      const favoritos = this.obtenerFavoritos()
      const existe = favoritos.some((f) => f.id === ruta.id)

      if (!existe) {
        favoritos.push({
          id: ruta.id,
          origen: ruta.origen,
          destino: ruta.destino,
          tipo: ruta.tipo,
          tramos: ruta.tramos,
          fechaGuardado: new Date().toISOString(),
        })
        localStorage.setItem(this.claveFavoritos, JSON.stringify(favoritos))
        return true
      }
      return false
    } catch (error) {
      console.error("[v0] Error al guardar favorito:", error)
      return false
    }
  }

  eliminarFavorito(rutaId) {
    try {
      const favoritos = this.obtenerFavoritos()
      const nuevosFavoritos = favoritos.filter((f) => f.id !== rutaId)
      localStorage.setItem(this.claveFavoritos, JSON.stringify(nuevosFavoritos))
      return true
    } catch (error) {
      console.error("[v0] Error al eliminar favorito:", error)
      return false
    }
  }

  esFavorito(rutaId) {
    const favoritos = this.obtenerFavoritos()
    return favoritos.some((f) => f.id === rutaId)
  }
}
