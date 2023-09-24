import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modaluser from "./Modaluser";
import Spinner from "./utils/spinner/Spinner";
import HeroSection from "./HeroSection";
import FAQ from "./FAQ";
import Instrucciones from "./Instrucciones";
import { verificarPagoExitoso } from "../hooks/actions";
import { db } from "../utils/Firebase/Fireconfig";
import { addDoc, collection } from "firebase/firestore";
import { Imagenes } from "../assets/img";

function ContainerNum({
  currentPage,
  setCurrentPage,
  disponibles,
  setDisponibles,
  getNumbers,
  setIsLoading,
  isLoading,
  myRef,
}) {
  const location = useLocation();

  const [numSelected, setnumSelected] = useState();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(31);
  const [show, setShow] = useState(false);
  const [approve, setApprove] = useState(false);
 

  const userNumbers = collection(db, "comprados");

  const postTiketsUser = async (tiketUser) => {
    await addDoc(userNumbers, tiketUser);
  };

  const pagoAceptado = verificarPagoExitoso(location);

  useEffect(() => {
    
      const tiketUser = JSON.parse(sessionStorage.getItem('dataUser')) ||  null;

     if(tiketUser != '' && pagoAceptado ) {

      console.log('desde container está el tiket user ');

   postTiketsUser(tiketUser) 
    
   } 
  }, []);

  /* control de  paginas */
  const nextHandle = () => {
    if (max < disponibles.length - 1) {
      setCurrentPage(currentPage + 1);

      console.log("next");
      setMax(max + 31);
      setMin(min + 31);
    }
  };
  const prevHandle = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      setMin(min - 31);
      setMax(max - 31);
    }

    console.log("prev");
  };

  /* /////////////////////////////////////////////////////////////////////////////selecciona el numero  //////////////////////////////////////*/
  const selectNum = (num) => {
    setnumSelected(num);

    /* abre el modal  */
    setShow(true);
  };

  return (
    <>
      <HeroSection myRef={myRef} />

      <Instrucciones myRef={myRef} />

      <div className=" mb-3  w-[70%] flex md:flex-row lg:flex-row flex-col  mt-10  items-center gap-3 justify-start  ">
        <div className=" md:w-[25%] lg:w-[25%] w-[95%] px-3 py-2 flex flex-col bg-principal text-white rounded-md shadow-md">
          <p>Página {currentPage} </p>
          <p> Números disponibles </p>
        </div>
        <p>
          {" "}
          <span className="font-bold">Info :</span> El sorteo se realizará con la lotería Nacional de fin de año{" "}
          <span className="font-bold">(Uruguay)</span> el 30 de Diciembre.
        </p>
      </div>
      {show ? (
        <Modaluser
          getNumbers={getNumbers}
          setShow={setShow}
          numSelected={numSelected}
          disponibles={disponibles}
          setDisponibles={setDisponibles}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
         
        />
      ) : (
        <>
          <div className="w-[70%] flex   gap-3  justify-center items-center flex-wrap border bg-white rounded-md  inset-48 border-gray-200 px-4 py-5">
            {isLoading ? <Spinner /> : ""}
            {disponibles?.slice(min, max).map((num, key) => {
              return (
                <div
                  key={key}
                  onClick={() => {
                    selectNum(num.num);
                  }}
                  className="flex flex-col py-2 px-4 text-center rounded-md text-white shadow-md bg-principal hover:bg-green-800 hover:text-white duration-200 cursor-pointer animate-flip-up animate-once animate-ease-in"
                >
                  <i className="fa-solid fa-ticket"></i> N° {num.ID}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-5  ">
            <button
              onClick={() => {
                prevHandle();
              }}
              className={`${
                min == 0 ? "  bg-gray-300  " : " bg-principal"
              } text-white  py-2 px-4 rounded-full`}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={() => {
                nextHandle();
              }}
              className="py-2 px-4 bg-principal text-white rounded-full"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </>
      )}

      <div className="flex flex-col w-[90%] text-center mt-6 justify-center items-center">


        <h2>El auto será exhibido en  </h2>

        <img  className="w-[100px] rounded-md shadow-md mt-3 mb-3 " src={Imagenes.montosi} alt="logo automotora" />

       <h3><span className="font-bold"> Dirección -  </span> Gral Artigas esq Zorrilla, Ciudad de Rocha, Uruguay</h3>
        <h2 className="mb-5 mt-5 text-3xl">FAQ - Preguntas frecuentes </h2>

        <FAQ
          titulo={"¿Cuál es el premio en juego?"}
          texto={"El premio es un Suzuki Alto  0km  "}
        />
        <FAQ
          titulo={
            "¿Existe la posibilidad de donar directamente a la organización benéfica sin comprar boletos?"
          }
          texto={
            "Es posible realizar una donación directa a la organización benéfica que respalda la causa de los refugios de animales sin la necesidad de comprar boletos para el sorteo. Sin embargo, queremos aclarar que esta opción no se encuentra bajo nuestra responsabilidad ni está relacionada con el proceso del sorteo en el que estás participando. Las donaciones directas a la organización benéfica pueden ser una excelente manera de apoyar la causa sin la expectativa de ganar un premio. Te recomendamos que te pongas en contacto directamente con la organización benéfica en cuestión para obtener información sobre cómo realizar una donación por separado. "
          }
        />

        <FAQ
          titulo={"¿Como se dará a conocer el ganador ?"}
          texto={
            "El ganador se revelará el 30 de Diciembre de 2023, después de llevar a cabo el sorteo de la Lotería Nacional. Esta revelación se realizará a través de una transmisión en vivo en la que se mostrará el número ganador. Además, nos comunicaremos con el ganador utilizando los medios de contacto proporcionados.   "
          }
        />
        <FAQ
          titulo={"¿Como será el proceso luego del sorteo ?"}
          texto={
            "El proceso después del sorteo será el siguiente: una vez se haya determinado al ganador, nos pondremos en contacto con él de manera directa y transparente para informarle sobre su premio. Queremos garantizar que el proceso sea completamente confiable y seguro. La entrega del premio se realizará públicamente, brindando todas las garantías posibles para asegurar que el ganador reciba su premio de manera justa y conforme a las reglas establecidas en el sorteo. Nuestra prioridad es garantizar la transparencia y la satisfacción de todos los participantes. "
          }
        />
        <FAQ
          titulo={
            "¿Qué garantías hay de que el sorteo sea justo y transparente?"
          }
          texto={
            "Queremos asegurarte que el sorteo se llevará a cabo de manera justa y transparente. El número ganador se determinará de acuerdo con los resultados oficiales de la Lotería Nacional Uruguaya en su sorteo programado para el 30 de Diciembre de 2023. Esto significa que el resultado del sorteo será de conocimiento público y estará respaldado por una entidad oficial, garantizando así la equidad y transparencia del proceso.   "
          }
        />
      </div>
    </>
  );
}

export default ContainerNum;
