import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAgendaContact,
  getAgenda,
  getAgendas,
} from "../services/contactServices";
import { useGlobalReducer } from "../hooks/useGlobalReducer";


const CreateContact = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalReducer();




  useEffect(() => {
    const takeData = async () => {
      try {
        const agendasList = await getAgendas();

        dispatch({
          type: "setAgendasList",
          payload: agendasList.agendas || [],
        });


      } catch (error) {
        console.log(error);
      }
    };
    takeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = {
      name: e.target.elements.nameInput.value || undefined,
      address: e.target.elements.addressInput.value || undefined,
      email: e.target.elements.emailInput.value || undefined,
      phone: e.target.elements.phoneInput.value || undefined,
    };

    const createNewContact = await createAgendaContact(
      state.selectedAgenda,
      newContact
    );

    const contactList = await getAgenda(state.selectedAgenda);
    dispatch({ type: "setAgendaData", payload: contactList.contacts });

    e.target.elements.nameInput.value = "";
    e.target.elements.addressInput.value = "";
    e.target.elements.emailInput.value = "";
    e.target.elements.phoneInput.value = "";

    createNewContact.ok
      ? alert("¡Contacto añadido!")
      : alert("¡Ups! algo salió mal. Seleccionaste agenda?");

      backToAgenda()
  };

  const selectAgenda = async (e) => {
    try {
      dispatch({ type: "selectAgenda", payload: e.target.value });
      const takeAgenda = await getAgenda(e.target.value);

      dispatch({ type: "setAgendaData", payload: takeAgenda.contacts });
      console.log(state.agendaData);
    } catch (error) {
      console.log(error);
    }
  };

  const backToAgenda = () => {
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex justify-content-end mb-2">
            <select
              className="form-select"
              aria-label="Seleccionar Agenda"
              value={state.selectedAgenda}
              onChange={selectAgenda}
              required
            >
              <option value="" disabled>
                Seleccionar Agenda
              </option>

              {state.agendas.map((agenda) => (
                <option key={agenda.id} value={agenda.slug}>
                  {agenda.slug}
                </option>
              ))}
            </select>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4">Añadir Nuevo Contacto</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder="Ej: Juan Perez"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Ej: juan.perez@example.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneInput" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneInput"
                    placeholder="Ej: 555-1234"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="addressInput" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addressInput"
                    placeholder="Ej: Calle Falsa 123"
                  />
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={backToAgenda}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver a la Agenda
                  </button>
                  <button type="submit" className="btn btn-success">
                    Guardar Contacto
                    <i className="bi bi-check-lg ms-2"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContact;
