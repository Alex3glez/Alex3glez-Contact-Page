import React from 'react';
import { createAgenda } from '../../services/contactServices';

const MyNavbar = () => {



  const handleSubmitCreate = (e) => {
    e.preventDefault();
    const agendaName = e.target.elements.agendaCreate.value;
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    const agendaName = e.target.elements.agendaDelete.value;
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container-fluid">
        
    
        <a className="navbar-brand" href="#">
          Gestor de Agendas
        </a>

    
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
          
        
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item me-lg-3">
              <form className="d-flex align-items-center" onSubmit={handleSubmitCreate}>
                
          
                <input 
                  className="form-control me-2" 
                  type="text" 
                  name="agendaCreate" 
                  placeholder="Crear Agenda" 
                  aria-label="Crear Agenda" 
                  required 
                />
                
          
                <div className="form-check me-2">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="confirmCreate"
                    name="confirmCreate"
                    required
                  />
                  <label className="form-check-label text-white text-nowrap" htmlFor="confirmCreate">
                    Confirmar
                  </label>
                </div>
                
              
                <button className="btn btn-success text-nowrap" type="submit">
                  Crear
                </button>
              </form>
            </li>

            
            <li className="d-lg-none"><hr className="dropdown-divider" /></li>

         
            <li className="nav-item mt-2 mt-lg-0">
              <form className="d-flex align-items-center" onSubmit={handleSubmitDelete}>
                
          
                <input 
                  className="form-control me-2" 
                  type="text"
                  name="agendaDelete"
                  placeholder="Borrar Agenda" 
                  aria-label="Borrar Agenda" 
                  required
                />
                
        
                <div className="form-check me-2">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="confirmDelete"
                    name="confirmDelete"
                    required
                  />
                  <label className="form-check-label text-white text-nowrap" htmlFor="confirmDelete">
                    Confirmar
                  </label>
                </div>
                
        
                <button className="btn btn-danger text-nowrap" type="submit">
                  Borrar
                </button>
              </form>
            </li>
          </ul>

      
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Seleccionar Agenda
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Agenda 1</a></li>
                <li><a className="dropdown-item" href="#">Agenda 2</a></li>
                <li><a className="dropdown-item" href="#">Agenda de "alex3glez"</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Otra opción</a></li>
              </ul>
            </li>
          </ul>

        </div> 
      </div>
    </nav>
  );
}

export default MyNavbar;