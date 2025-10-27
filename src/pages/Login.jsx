import React, { useEffect, useState } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { getAgenda, getAgendas } from "../services/contactServices";
import { useNavigate } from "react-router-dom";

function Login() {
  const [agendas, setAgendas] = useState([]);

  const { state, dispatch } = useGlobalReducer();

  const navigate = useNavigate();

  useEffect(() => {
    const takeData = async () => {
      try {
        const agendasList = await getAgendas();

        setAgendas(agendasList.agendas || []);
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

  const toHome = (e) => {
    e.preventDefault();

    navigate("/home");
  };

  const toAgendaManaging = (e) => {
    e.preventDefault();
    navigate("/agendaManaging");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-sm d-flex"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div className="card-body p-4 p-md-5">
          <h3 className="card-title text-center mb-4">Seleccionar Agenda</h3>
          <p className="text-center text-muted mb-4">
            Elige la agenda a la que deseas acceder.
          </p>

          <form onSubmit={toHome}>
            <div className="mb-3">
              <label htmlFor="agendaSelect" className="form-label">
                Agendas disponibles
              </label>

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

                {agendas.map((agenda) => (
                  <option key={agenda.id} value={agenda.slug}>
                    {agenda.slug}
                  </option>
                ))}

              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">
              Acceder a la Agenda
            </button>

            <hr className="my-4" />

            <button
              onClick={toAgendaManaging}
              type="button"
              className="btn btn-outline-secondary w-100"
            >
              Gestionar Agendas
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
