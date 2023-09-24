import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Spinner from "./utils/spinner/Spinner";

 const mercadoPagoKey = process.env.REACT_APP_MERCADO_PAGO_KEY; 
initMercadoPago(mercadoPagoKey);

function Modaluser({
  setShow,
  numSelected,
  setDisponibles,
  disponibles,
  getNumbers,
  isLoading,
  setIsLoading,
}) {
  const [nombreUser, setNombre] = useState("");
  const [apellidoUser, setApellido] = useState();
  const [documentoUser, setDocumento] = useState();
  const [telUser, setTelefono] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState();
  const [errors, setErrors] = useState([]);
  const [id_preference, set_Id_preference] = useState();
  const [orderData, setOrderData] = useState({
    quantity: "1",
    price: "1000",
    amount: 1,
    description: `N° ${numSelected} bono colaboración `,
  });

  const [showForm, setShowForm] = useState(true);

  const regexDocumento = /^\d{8}$/;
  const regexTelefono = /^\d{9}$/;

  const handleClick = async () => {
    try {
      const response = await fetch("https://mercadopago-8lw0-dev.fl0.io/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      set_Id_preference(data.preferenceId);
      console.log(id_preference);

      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fecha = new Date();

    setDate(
      `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} `
    );
  }, []);

  const saveUserData = (
    nombreUser,
    apellidoUser,
    documentoUser,
    telUser,
    numSelected,
    date,
    isChecked
  ) => {
    sessionStorage.setItem(
      "dataUser",
      JSON.stringify({
        nombre: nombreUser,
        apellido: apellidoUser,
        documento: documentoUser,
        tel: telUser,
        numero: numSelected,
        fecha: date,
        isChecked: isChecked,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      nombreUser.trim(),
      apellidoUser.trim(),
      documentoUser,
      telUser,
      numSelected,
      date,
    ];
    const isValidDocumento = regexDocumento.test(documentoUser);
    const isValidTelefono = regexTelefono.test(telUser);

    if (requiredFields.every((field) => field !== "")) {
      if (!isValidDocumento) {
        setErrors([...errors, "Documento inválido"]);
      } else if (!isValidTelefono) {
        setErrors([...errors, "Teléfono inválido"]);
      } else if (!isChecked) {
        setErrors([...errors, "Debe aceptar las políticas de privacidad"]);
      } else {
        saveUserData(
          nombreUser,
          apellidoUser,
          documentoUser,
          telUser,
          numSelected,
          date,
          isChecked
        );

        handleClick();

        setShowForm(false);
      }
    } else {
      setErrors([
        ...errors,
        "Complete los campos obligatorios indicados con *",
      ]);
    }

    setTimeout(() => {
      setErrors([]);
    }, 1500);
  };

  return (
    <div className="w-screen h-screen z-10  animate-fade animate-once animate-ease-in bg-backgroundModal flex flex-col justify-center items-center    ">
      {showForm ? (
        <div className="md:w-5/12 lg:w-5/12 w-11/12  animate-fade-up animate-once bg-white py-3 px-4 shadow-lg rounded-md  ">
          <h2 className="text-center mb-4 mt-2">
            Cargue sus datos para participar
          </h2>

          {errors
            ? errors.map((err, key) => (
                <p className="text-red-600 text-sm text-center">{err}</p>
              ))
            : ""}

          <form
            className="w-6/12 m-auto flex flex-col gap-3 "
            onSubmit={handleSubmit}
          >
            <label>
              {" "}
              Nombre <span className="text-red-600">*</span>{" "}
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-green-800 py-2 px-3  rounded-md shadow-md"
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
            <label>
              {" "}
              Apellido <span className="text-red-600">*</span>{" "}
            </label>
            <input
              className="bg-gray-50 border border-green-800 py-2 px-3 rounded-md shadow-md"
              type="text"
              onChange={(e) => {
                setApellido(e.target.value);
              }}
            />
            <label>
              {" "}
              Documento <span className="text-red-600">*</span>
            </label>
            <input
              className="bg-gray-50 border border-green-800 py-2 px-3 rounded-md shadow-md"
              type="text"
              onChange={(e) => {
                setDocumento(e.target.value);
              }}
            />
            <label>
              Teléfono <span className="text-red-600">*</span>{" "}
            </label>
            <input
              className="bg-gray-50 border border-green-800 py-2 px-3 rounded-md shadow-md"
              type="tel"
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
            />

            <div className="flex  justify-center items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />

              <p className="text-center">
                Acepto y estoy de acuerdo con las{" "}
                <Link to={"/policy&terms"} className="text-sky-700">
                  Políticas de privacidad
                </Link>
              </p>
            </div>
            <div className="flex w-full justify-center items-center gap-3">
              <input
                type="submit"
                value={"Confirmar"}
                className="py-2 px-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-green-700 duration-150 hover:cursor-pointer "
              />
              <button
                onClick={() => {
                  setShow(false);
                }}
                className="py-2 px-3 bg-white border border-red-800 text-red-800 rounded-md shadow-md hover:bg-red-700 duration-150 hover:cursor-pointer hover:text-white "
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
      {id_preference && (
        <div className="flex flex-col justify-center items-center">
          {" "}
          <h3>Continúa a Mercado Pago </h3>
          <Wallet initialization={{ preferenceId: id_preference }} />{" "}
        </div>
      )}
    </div>
  );
}

export default Modaluser;
