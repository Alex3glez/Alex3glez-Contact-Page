import React, { useState } from "react";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";
import {
  deleteAgendaContact,
  updateAgendaContact,
} from "../../services/contactServices";

const ContactCard = ({ name, phone, email, address, img, id }) => {
  const { state, dispatch } = useGlobalReducer();

  const [isEditing, setIsEditing] = useState(false);
  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: name || "",
    phone: phone || "",
    email: email || "",
    address: address || "",
    img: img || "",
    id: id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageSelect = (imageUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      img: imageUrl,
    }));
    setIsDropdownOpen(false); 
  };

 
  const handleSave = async () => {
    try {
      
      const cheatAdressImg = `${formData.address}||textoparaquenorompaelcodigoyhacersplit10294||${formData.img}`;

      
      const contactToSave = {
        name: formData.name,       
        phone: formData.phone,     
        email: formData.email,     
        address: cheatAdressImg,
      };

      
      await updateAgendaContact(state.selectedAgenda, id, contactToSave);

      
      const updatedGlobalContact = {
        ...contactToSave,
        id: id
      };

      
      const updatedContacts = state.agendaData.map((contact) =>
        contact.id === id ? updatedGlobalContact : contact
      );
      dispatch({ type: "setAgendaData", payload: updatedContacts });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ name, phone, email, address, img, id });
  };

  const deleteContact = async () => {
    try {
      await deleteAgendaContact(state.selectedAgenda, id);
      const newAgendaData = state.agendaData.filter(
        (contact) => contact.id !== id
      );
      dispatch({ type: "setAgendaData", payload: newAgendaData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          
          <div className="col-md-3 text-center">
            <img
              src={img}
              className="img-fluid rounded-circle"
              alt={`Foto de perfil de ${name || "Alejandro"}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6">
            {isEditing ? (
              <div>
                
                <div className="mb-3">
                  <label htmlFor="nameInput" className="form-label">Nombre:</label>
                  <input type="text" name="name" id="nameInput" className="form-control rounded-pill shadow-sm" value={formData.name} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="addressInput" className="form-label">Dirección:</label>
                  <input type="text" name="address" id="addressInput" className="form-control rounded-pill shadow-sm" value={formData.address} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneInput" className="form-label">Teléfono:</label>
                  <input type="tel" name="phone" id="phoneInput" className="form-control rounded-pill shadow-sm" value={formData.phone} onChange={handleInputChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email:</label>
                  <input type="email" name="email" id="emailInput" className="form-control rounded-pill shadow-sm" value={formData.email} onChange={handleInputChange}/>
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
                        className="form-control rounded-pill shadow-sm mb-3"
                        value={formData.img}
                        onChange={handleInputChange}
                      />
                      <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                       
                      >
                        O selecciona R&M
                      </button>
                     
                      <ul 
                        className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`} 
                        style={{ maxHeight: '200px', overflowY: 'auto' }}
                      >
                        {state.rickAndMortyData && state.rickAndMortyData.results ? (
                          state.rickAndMortyData.results.map((character) => (
                            <li key={character.id}>
                              <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                
                                onClick={() => handleImageSelect(character.image)}
                              >
                                <img
                                  src={character.image}
                                  alt={character.name}
                                  width="30"
                                  height="30"
                                  className="rounded-circle me-2"
                                  style={{ objectFit: "cover" }}
                                />
                                <span className="text-wrap">{character.name}</span>
                              </button>
                            </li>
                          ))
                        ) : (
                          <li>
                            <span className="dropdown-item text-muted">Cargando...</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                

              </div>
            ) : (
             
              <>
                <h5 className="card-title mb-3">{name || "Sin nombre"}</h5>
                <ul className="list-unstyled mb-0">
                  <li className="text-muted d-flex mb-2">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    {address || "Nómada/mochilero"}
                  </li>
                  <li className="text-muted d-flex mb-2">
                    <i className="bi bi-telephone-fill me-2"></i>
                    {phone || "Sin teléfono"}
                  </li>
                  <li className="text-muted d-flex">
                    <i className="bi bi-envelope-fill me-2"></i>
                    {email || "Sin email"}
                  </li>
                </ul>
              </>
            )}
          </div>

          
          <div className="col-md-3 text-end">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="btn btn-outline-success fs-5"
                >
                  <i className="bi bi-check-lg"></i>
                </button>
                <button
                  onClick={handleCancel}
                  className="btn btn-outline-secondary fs-5 ms-2"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline-primary fs-5"
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
                <button
                  onClick={deleteContact}
                  className="btn btn-outline-danger fs-5 ms-2"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactCard;
