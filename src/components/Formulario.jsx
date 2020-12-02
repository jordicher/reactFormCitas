import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from "prop-types";

const Formulario = ({crearCita}) => {

    // Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);


    //actualizarCita, funcio que s'ejectua cada vegada que l'usuari escriu
    const actualizarState = (e) => {

        // cita.mascota=e.target.value; no es pot fer no segueix les normes de react

        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })//amb spread operator fem una copia        
    }

    //extraer los valores, destructuring
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //quan l'usuari presioni agregar cita
    const submitCita = (e) => {
        e.preventDefault();

        //validar
        //trim treu els espais en blanc dels principi al final
        if (mascota.trim() === "" || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "") {
            actualizarError(true);
            return; //si hi ha un erro parem aqui, i actualitzarError es mante en true
        }

        //eliminar mensaje omple els camps
        actualizarError(false);

        //asignar un id
        cita.id = uuid();
        // console.log(cita);
        //crear la cita

        crearCita(cita);

        //reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <Fragment>
            <h2>Crear cita</h2>

            {error ? <p className="alerta-error">tots els camps son obligatoris</p> : null} {/* S'inicia amb false error, per tant no fa res */}

            <form onSubmit={submitCita}>
                <label> Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label> Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="nombre dueño mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label> Fecha </label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label htmlFor="">Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Enviar</button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario