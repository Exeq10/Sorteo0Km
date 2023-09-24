import { useState } from "react";


function FAQ({titulo,texto}) {

    const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border  md:w-[50%] lg:w-[50%] w-[90%] border-gray-300 rounded mb-4 bg-white animate-fade-right">
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-md text-start font-semibold ">{titulo}</h2>
        {
            !isOpen ? <i className="fa-solid fa-chevron-down "></i> : <i className="fa-solid fa-chevron-up"></i>
        }
       
      </div>
      {isOpen && (
        <div className="px-4 py-2 animate-fade-down">
          <p >{texto}</p>
        </div>
      )}
    </div>
  )
       
      
}

export default FAQ