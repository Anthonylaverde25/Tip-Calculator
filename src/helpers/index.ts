// Exporta una función llamada formatCurrency que formatea un número como una cantidad de dinero en dólares estadounidenses
export function formatCurrency(quantity: number) {
  // Crea un nuevo objeto Intl.NumberFormat con la configuración regional en-US (inglés estadounidense) y el estilo de formato de moneda
  return new Intl.NumberFormat("en-US", {
    // Establece el estilo de formato como "currency" para formatear como cantidad de dinero
    style: "currency",
    // Especifica la moneda como USD (dólares estadounidenses)
    currency: "USD",
  }).format(quantity); // Llama al método format para formatear el número dado como una cantidad de dinero en dólares
}
