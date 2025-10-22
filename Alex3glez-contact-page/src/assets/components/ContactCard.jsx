



const ContactCard= ({name, phone, email, address, id})=>{


    return(
        <div className="card mb-3" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{name||"Alejandro"}</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
    )
}


export default ContactCard