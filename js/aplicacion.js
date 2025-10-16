import { GestorDatos } from "./gestor-datos.js"
import { CalculadorRutas } from "./calculador-rutas.js"
import { InterfazUsuario } from "./interfaz-usuario.js"
import { GestorFavoritos } from "./gestor-favoritos.js"

class Aplicacion {
  constructor() {
    this.gestorDatos = new GestorDatos()
    this.calculadorRutas = new CalculadorRutas()
    this.gestorFavoritos = new GestorFavoritos()
    this.interfazUsuario = new InterfazUsuario(
      this.gestorDatos,
      this.calculadorRutas,
      this.gestorFavoritos
    )
  }

  async inicializar() {
    await this.gestorDatos.cargarDatos()
    this.interfazUsuario.inicializar()
  }
}

const app = new Aplicacion()
app.inicializar()
