
 export function verificarPagoExitoso(location) {
    // Verifica si existe el parámetro 'collection_status' y 'payment_id'
    const { search } = location;
    const searchParams = new URLSearchParams(search);
  
    if (searchParams.has('collection_status') && searchParams.has('payment_id')) {
      // Obtiene el valor de 'collection_status' y 'payment_id'
      const collectionStatus = searchParams.get('collection_status');
      const paymentId = searchParams.get('payment_id');
  
      // Verifica si el estado de la colección es 'approved' (aprobado)
      if (collectionStatus === 'approved') {
        // El pago fue aceptado
        console.log('El pago con ID', paymentId, 'fue aceptado.');
        
        // También puedes obtener otros valores, como el monto del pago
        if (searchParams.has('monto')) {
          const montoPago = searchParams.get('monto');
          console.log('Monto del pago:', montoPago);
        }
  
        return true; // Pago aceptado
      }
    }
  
    return false; // Pago no aceptado o faltan parámetros
  }
  
 
  
 