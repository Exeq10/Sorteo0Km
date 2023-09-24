import { useState, useEffect, useRef } from "react";
import ContainerNum from "./components/ContainerNum";
import {
  createBrowserRouter,
  
  RouterProvider,
 
} from "react-router-dom";
import Terminos from "./components/Terminos";
import { db } from "./utils/Firebase/Fireconfig";
import { getDocs, collection } from "firebase/firestore";
import HeroSection from "./components/HeroSection";
import Instrucciones from "./components/Instrucciones";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
function App() {
  const myRef = useRef();

  

  const [disponibles, setDisponibles] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const comprados = collection(db, "comprados");
  const [pedidosComprados, setPedidosComprados] = useState();
  const [isLoading, setIsloading] = useState(false);

  const getNumbers = async () => {
    setIsloading(true);
    try {
      const numbersDb = await getDocs(comprados);

     
      const pedidosData = numbersDb.docs.map((doc) => ({

        
        ...doc.data(),
        id: doc.numero,
      }));

    ;

      setPedidosComprados(pedidosData);

      let localNumbers = [];

      // Crear un arreglo con objetos {ID, num} desde el 1000 al 9999
      const allNumbers = Array.from({ length: 9000 }, (_, i) => ({
        ID: i + 1000,
        num: i + 1000,
      }));
      // Filtrar los objetos que no están en Firestore
      localNumbers = allNumbers.filter((numeroObj) => {
        return !pedidosData.some((pedido) => pedido.numero === numeroObj.num);
      });

      setDisponibles(localNumbers);

      console.log("Pedidos Comprados:", pedidosData);
      console.log("Disponibles:", localNumbers);

      // Guardar el arreglo actualizado en el local storage
      localStorage.setItem("numbers", JSON.stringify(localNumbers));

      setIsloading(false);
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  };

  useEffect(() => {
    getNumbers();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ContainerNum
        myRef={myRef}
          isLoading={isLoading}
          setIsloading={setIsloading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          disponibles={disponibles}
          setDisponibles={setDisponibles}
          getNumbers={getNumbers}
        />
      ),
    },

    {
      path: "/policy&terms",
      element: <Terminos />,
    },

  
  ]);

  return (
    <section className="flex flex-col justify-center items-center">
      

      <RouterProvider router={router} />

     
      


      <Footer/>
    </section>




  );
}

export default App;
