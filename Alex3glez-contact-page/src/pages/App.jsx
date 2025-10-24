import React, { useState } from 'react';
import ContactCard from '../assets/components/ContactCard.jsx';
import MyNavbar from '../assets/components/navbar.jsx';


const App = ()=> {

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Mike Anamendolla",
      address: "5842 Hillcrest Rd",
      phone: "(870) 288-4149",
      email: "mike.ana@example.com"
    },
    {
      id: 2,
      name: "Mike Anamendolla",
      address: "5842 Hillcrest Rd",
      phone: "(870) 288-4149",
      email: "mike.ana@example.com"
    },
    {
      id: 3,
      name: "Mike Anamendolla",
      address: "5842 Hillcrest Rd",
      phone: "(870) 288-4149",
      email: "mike.ana@example.com"
    },
    {
      id: 4,
      name: "Mike Anamendolla",
      address: "5842 Hillcrest Rd",
      phone: "(870) 288-4149",
      email: "mike.ana@example.com"
    }
  ]);

  const handleAddContact = () => {
    alert("aqui mandamos a una pagina");
  };

  return (
    <>  
    <MyNavbar />
    <div>
      <div className="container mt-5">
        
        <div className="row mb-4">
          <div className="col text-end">
            <button 
              className="btn btn-success" 
              onClick={handleAddContact}
            >
              Add new contact
            </button>
          </div>
        </div>

        
        <div className="row justify-content-center"> 
        
          <div className="col-12 col-md-10 col-lg-8"> 
            {contacts.map(contact => (
              <ContactCard 
                key={contact.id}
                name={contact.name}
                address={contact.address}
                phone={contact.phone}
                email={contact.email}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default App;