import { GestorDatos } from "./gestor-datos.js"
import { CalculadorRutas } from "./calculador-rutas.js"
import { InterfazUsuario } from "./interfaz-usuario.js"
import { GestorFavoritos } from "./gestor-favoritos.js"
import { GestorIdioma } from "./gestor-idioma.js"
import { GestorTema } from "./gestor-tema.js"

class Aplicacion {
  constructor() {
    this.gestorDatos = new GestorDatos()
    this.calculadorRutas = new CalculadorRutas()
    this.gestorFavoritos = new GestorFavoritos()
    this.gestorIdioma = new GestorIdioma()
    this.gestorTema = new GestorTema()
    this.interfazUsuario = new InterfazUsuario(
      this.gestorDatos,
      this.calculadorRutas,
      this.gestorFavoritos,
      this.gestorIdioma,
      this.gestorTema
    )
  }

  async inicializar() {
    await this.gestorDatos.cargarDatos()
    await this.gestorIdioma.cargarTraducciones()
    this.interfazUsuario.inicializar()
    this.actualizarTextos()
  }

  actualizarTextos() {
    document.querySelectorAll("[data-i18n]").forEach((elemento) => {
      const clave = elemento.getAttribute("data-i18n")
      elemento.textContent = this.gestorIdioma.t(clave)
    })

    document.querySelectorAll("[data-i18n-placeholder]").forEach((elemento) => {
      const clave = elemento.getAttribute("data-i18n-placeholder")
      elemento.placeholder = this.gestorIdioma.t(clave)
    })
  }
}

const app = new Aplicacion()
app.inicializar()

window.app = app
