import React, { Fragment, useEffect, useState } from "react";
import "./index.css";

import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {

   // Citas en localstorage
   let citasIniciales = JSON.parse(localStorage.getItem("citas"));
   if(!citasIniciales){
     citasIniciales=[];
   }
 
  //array de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));
    //seria com el document.ready o DOMContentLoaded
    // quan s'actualitza algo es torna a recarregar
    console.log("listo");

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]); //amb [] nomes es carrega cada vegada que canvia, en aquest cas citas, quan exemple fem api...millor possarho per evitar cicles



  //Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    console.log(cita);
    guardarCitas([
      ...citas, //per copiar les que hi haigi
      cita,
    ]);
  };

  // Funcion eliminar cita por id

  const eliminarCita = (id) => {
    console.log(id);

    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mensaje si no hay citas
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  // useEffect

 

 
  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {/* {citas.length === 0 ? (<h2>No hay citas</h2>) : (<h2>Administra tus citas</h2>)} */}
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
