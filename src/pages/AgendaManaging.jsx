import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAgenda,
  deleteAgenda,
  getAgenda,
  getAgendas,
} from "../services/contactServices";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

function AgendaManaging() {
  const { state, dispatch } = useGlobalReducer();

  const navigate = useNavigate();
  const toLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

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

  const handleBorrar = async (e) => {
    e.preventDefault();
    const agendaId = e.target.agendaDelete.value;
    const confirmacion = e.target.confirmarBorrado.checked;

    if (!agendaId) {
      alert("Por favor, selecciona una agenda para borrar.");
      return;
    }
    if (!confirmacion) {
      alert("Debes confirmar que deseas borrar la agenda.");
      return;
    }
    try {
      e.preventDefault();
      const agendaName = e.target.elements.agendaDelete.value;
      await deleteAgenda(agendaName);
      const agendasList = await getAgendas();
      dispatch({ type: "setAgendasList", payload: agendasList.agendas || [] });
      dispatch({ type: "selectAgenda", payload: "" });
      e.target.elements.agendaDelete.value = "";
      e.target.elements.confirmarBorrado.checked = false;
    } catch (error) {
      console.log(error);
    }

    alert(`Agenda con ID "${agendaId}" borrada.`);
  };

  const handleSubmitCreate = async (e) => {
    try {
      e.preventDefault();
      const agendaName = e.target.elements.agendaCreate.value.trim();
      if (agendaName === "") return alert(`Debes introducir algún carácter`);
      const createTheAgenda = await createAgenda(agendaName);
      const agendasList = await getAgendas();
      const contactList = await getAgenda(state.selectedAgenda);
      dispatch({ type: "setAgendaData", payload: contactList.contacts });
      dispatch({ type: "setAgendasList", payload: agendasList.agendas || [] });
      dispatch({ type: "selectAgenda", payload: agendaName });
      createTheAgenda.ok
        ? alert("¡Agenda creada!")
        : alert("¡Ups! algo salió mal.");

      e.target.elements.agendaCreate.value = "";
      e.target.elements.confirmCreate.checked = false;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-sm"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <div className="card-body p-4 p-md-5">
          <h3 className="card-title text-center mb-4">Gestionar Agendas</h3>

          <form onSubmit={handleSubmitCreate}>
            <h5 className="mb-3">Crear Nueva Agenda</h5>

            <div className="mb-3">
              <label htmlFor="nombreAgenda" className="form-label">
                Nombre de la nueva agenda
              </label>
              <input
                type="text"
                className="form-control"
                id="nombreAgenda"
                name="agendaCreate"
                placeholder="Ej: Agenda del Gimnasio"
                required
              />
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="esPrincipal"
                name="confirmCreate"
                required
              />
              <label className="form-check-label" htmlFor="esPrincipal">
                Acepto condiciones
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Crear Agenda
            </button>
          </form>

          <hr className="my-4" />

          <form onSubmit={handleBorrar}>
            <h5 className="mb-3">Borrar Agenda Existente</h5>

            <div className="mb-3">
              <label htmlFor="borrarAgendaSelect" className="form-label">
                Selecciona la agenda a borrar
              </label>
              <select
                className="form-select"
                aria-label="Seleccionar Agenda"
                name="agendaDelete"
                value={state.selectedAgenda}
                onChange={selectAgenda}
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

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="confirmarBorrado"
                name="confirmarBorrado"
                required
              />
              <label className="form-check-label" htmlFor="confirmarBorrado">
                Sí, estoy segur@ de que quiero borrar esta agenda.
              </label>
            </div>

            <button type="submit" className="btn btn-danger w-100">
              Borrar Permanentemente
            </button>
          </form>

          <hr className="my-4" />

          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={toLogin}
          >
            Volver a Selección de Agendas
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgendaManaging;
