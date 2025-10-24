
const ContactCard = ({ name, phone, email, address}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-3 text-center">
            <img 
              src="/michi_empresario.jpg" 
              className="img-fluid rounded-circle" 
              alt={`Foto de perfil de ${name || "Alejandro"}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <h5 className="card-title mb-3">{name || "Alejandro"}</h5>
            <ul className="list-unstyled mb-0">
              <li className="text-muted d-flex mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>
                {address || "Mi casa"}
              </li>
              <li className="text-muted d-flex mb-2">
                <i className="bi bi-telephone-fill me-2"></i>
                {phone || "777 777 777"}
              </li>

              <li className="text-muted d-flex">
                <i className="bi bi-envelope-fill me-2"></i>
                {email || "michi_empresario@example.com"}
              </li>
            </ul>
          </div>

         
          <div className="col-md-3 text-end">
          
            <button className="btn btn-link text-dark fs-5">
              <i className="bi bi-pencil-fill"></i>
            </button>
            
          
            <button className="btn btn-link text-danger fs-5 ms-2">
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactCard;