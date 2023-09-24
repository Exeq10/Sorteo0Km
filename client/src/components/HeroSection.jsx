import {useState,useEffect} from 'react'

import { Imagenes } from '../assets/img';

// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay'


function HeroSection({myRef}) {


  const [background,setBackground]= useState({
    slideone : '',
    slidetwo : ''
  })

  const [medidas,setmedidas]= useState()
  const scrollToMyRef = () => {
    window.scrollTo({
      top: myRef.current.offsetTop,
      behavior: 'smooth', // Para lograr un desplazamiento suave
    });
  };



  function ejecutarSegunResolucion() {
    const ancho = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    if (ancho <= 576) {
      // Acciones para pantallas extra pequeñas (menos o igual a 576px de ancho)
      setBackground({

        slideone : Imagenes.rAlto,
        slidetwo :Imagenes.rcolaboracion
      })

      setmedidas('top-[90%] left-14')
      console.log("Estás en una pantalla extra pequeña.");
      // Agrega aquí las acciones específicas para pantallas extra pequeñas.
    } else if (ancho <= 768) {
      // Acciones para pantallas pequeñas (entre 577px y 768px de ancho)
      setBackground({

        slideone : Imagenes.rAlto,
        slidetwo :Imagenes.rcolaboracion
      })
      setmedidas('top-[90%] left-14')
      console.log("Estás en una pantalla pequeña.");
      // Agrega aquí las acciones específicas para pantallas pequeñas.
    } else if (ancho <= 992) {
      // Acciones para pantallas medianas (entre 769px y 992px de ancho)
      setBackground({

        slideone : Imagenes.Alto,
        slidetwo :Imagenes.Colaboracion
      })
      console.log("Estás en una pantalla mediana.");
      // Agrega aquí las acciones específicas para pantallas medianas.
    } else if (ancho <= 1200) {
      // Acciones para pantallas grandes (entre 993px y 1200px de ancho)
      setBackground({

        slideone : Imagenes.Alto,
        slidetwo :Imagenes.Colaboracion
      })
      setmedidas('top-[80%] left-10')
      console.log("Estás en una pantalla grande.");
      // Agrega aquí las acciones específicas para pantallas grandes.
    } else {
      // Acciones para pantallas extra grandes (más de 1200px de ancho)
      setBackground({

        slideone : Imagenes.Alto,
        slidetwo :Imagenes.Colaboracion
      })
      setmedidas('top-[80%] left-10')
      console.log("Estás en una pantalla extra grande.");
      // Agrega aquí las acciones específicas para pantallas extra grandes.
    }
  }
  
  // Ejemplo de uso:
useEffect(() => {
  
  ejecutarSegunResolucion();
 
  
}, [])


  return (
    <section className={`w-screen  h-screen  bg-cover bg-center mb-8 `} >

<Swiper 
 spaceBetween={30}
 centeredSlides={true}
 autoplay={{
   delay: 5500,
   disableOnInteraction: false,
 }}
 pagination={{
   clickable: true,
 }}
 navigation={false}
 modules={[Autoplay, Pagination, Navigation]}
    
    >
      <SwiperSlide><img src={background.slideone} alt="background" />  <button onClick={()=> scrollToMyRef()}   className={`py-2 px-3 animate-bounce  w-72 absolute ${medidas} bg-white text-sky-600 text-3xl font-poppins rounded-md shadow-xl `}>Participá</button>
</SwiperSlide>
      <SwiperSlide><img src={background.slidetwo} alt="background" /> <button onClick={()=> scrollToMyRef()}   className={`py-2 px-3 animate-bounce  w-72 absolute ${medidas}  bg-white text-sky-600 text-3xl font-poppins rounded-md shadow-xl `}>Participá</button></SwiperSlide>
    
    </Swiper>
    
      



     


       
    </section>
  )
}

export default HeroSection