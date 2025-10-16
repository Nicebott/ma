export function debounce(func, espera) {
  let timeout
  return function ejecutar(...args) {
    const despues = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(despues, espera)
  }
}

export function formatearMoneda(cantidad) {
  return `RD$${cantidad.toFixed(2)}`
}

export function formatearTiempo(minutos) {
  if (minutos < 60) {
    return `${minutos} min`
  }
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  return `${horas}h ${mins}min`
}
