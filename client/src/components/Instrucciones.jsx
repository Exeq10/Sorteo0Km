import React from 'react'

function Instrucciones({myRef}) {
  return (
    <div className='text-center mt-10'>

    <h2 ref={myRef} className='text-2xl  font-bold  mb-4'>Como participar</h2>

   

    <ul className='flex flex-col  gap-2 mt-2'>
       <div className='py-2 px-3 bg-white'> <li className='font-bold'>Paso 1</li>
        <p>Deberá seleccionar un número entre los disponibles (1000 - 9799)</p>
        </div>
        <div className='py-2 px-3 bg-white'>
        <li className='font-bold'>Paso 2</li>
        <p>Una vez seleccionado, se desplegará un formulario el cuál debe completar con sus datos para poder contactarlo en caso de ser el ganador. </p> </div>
        
        <div className='py-2 px-3 bg-white'>
        <li className='font-bold'>Paso 3</li>
        <p>Cuando envíe los datos, se desplegará el botón de mercado pago que lo llevará a su plataforma para realizar el pago.  </p></div>
        <div className='py-2 px-3 bg-white'>
        <li className='font-bold'>Paso 4</li>
        <p>Deberá completar los datos solicitados dentro de mercado pago para adquirir el número seleccionado.  </p> </div>
        <div className='py-2 px-3 bg-white'>
        <li className='font-bold'>Paso 5</li>
        <p>Deberá seleccionar como forma de pago (Únicamente pago desde la web o tarjetas de crédito/débito, no se aceptaran pagos en efectivo)  </p></div>
        <div className='py-2 px-3 bg-white'>
        <li className='font-bold'>Paso 6</li>
        <p>Una vez realizado el pago recibirá en su cuenta de correo electrónico la confirmación del mismo donde indicará el número comprado </p></div>
    </ul>


    </div>
  )
}

export default Instrucciones