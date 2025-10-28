import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAgendaContact,
  getAgenda,
  getAgendas,
} from "../services/contactServices";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { getRickAndMortyData } from "../services/ImagesRickAndMorty";

const CreateContact = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalReducer();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const takeData = async () => {
      try {
        const agendasList = await getAgendas();

        dispatch({
          type: "setAgendasList",
          payload: agendasList.agendas || [],
        });

        const data = await getRickAndMortyData();

        await dispatch({ type: "setRickAndMortyData", payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    takeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cheatAdressImg = `${
      e.target.elements.addressInput.value || undefined
    }||textoparaquenorompaelcodigoyhacersplit10294||${
      e.target.elements.imgInput.value
    }`;

    const newContact = {
      name: e.target.elements.nameInput.value || undefined,
      address: cheatAdressImg,
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

    backToAgenda();
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

  const handleImageSelect = (imageUrl) => {
    document.getElementById("imgInput").value = imageUrl;
    setIsDropdownOpen(false);
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

                <div className="mb-3">
                  <label htmlFor="imgInput" className="form-label">
                    Url imagen:
                  </label>
                  <div className="position-relative">
                    <div>
                      <input
                        type="url"
                        name="img"
                        id="imgInput"
                        className="form-control mb-3"
                        placeholder="Ej: https://mi-imagen.com/foto.png"
                      />
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                      >
                        O selecciona R&M
                      </button>
                      <ul
                        className={`dropdown-menu dropdown-menu-end ${
                          isDropdownOpen ? "show" : ""
                        }`}
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {state.rickAndMortyData &&
                        state.rickAndMortyData.results ? (
                          state.rickAndMortyData.results.map((character) => (
                            <li key={character.id}>
                              <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={() =>
                                  handleImageSelect(character.image)
                                }
                              >
                                <img
                                  src={character.image}
                                  alt={character.name}
                                  width="30"
                                  height="30"
                                  className="rounded-circle me-2"
                                  style={{ objectFit: "cover" }}
                                />
                                <span className="text-wrap">
                                  {character.name}
                                </span>
                              </button>
                            </li>
                          ))
                        ) : (
                          <li>
                            <span className="dropdown-item text-muted">
                              Cargando...
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
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
