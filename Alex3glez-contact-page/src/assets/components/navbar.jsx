import React, { useEffect, useState } from "react";
import { getAgenda, getAgendas } from "../../services/contactServices";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  const [agendas, setAgendas] = useState([]);
  const { state, dispatch } = useGlobalReducer();

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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link to={"/agendaManaging"} className="navbar-brand" href="#">
          Gestor de Agendas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/"} className="nav-link" href="#">
                Volver a login
              </Link>
            </li>
          </ul>

          {state.selectedAgenda && (
            <h1 className="navbar-text text-light  fs-2 m-auto">
              Agenda: {state.selectedAgenda}
            </h1>
          )}

          <div className="d-flex ms-auto">
            <select
              className="form-select"
              aria-label="Seleccionar Agenda"
              value={state.selectedAgenda}
              onChange={selectAgenda}
            >
              <option value="" disabled>
                Cambiar de agenda
              </option>

              {agendas.map((agenda) => (
                <option key={agenda.id} value={agenda.slug}>
                  {agenda.slug}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
