

function Footer() {
const date = new Date()


const año = date.getFullYear()

  return (
    <div className='bg-principal w-full py-3 px-3 flex justify-end items-center'>
        
        <p className='text-white'>Powered by  ©Exequiel Schiavo  {año}  </p>
         </div>
  )
}

export default Footer