import React, { useEffect, useState } from "react";
import ContactCard from "../assets/components/ContactCard.jsx";
import MyNavbar from "../assets/components/navbar.jsx";
import { useGlobalReducer } from "../hooks/useGlobalReducer.jsx";
import { getRickAndMortyData } from "../services/ImagesRickAndMorty.js";
import { useNavigate } from "react-router-dom";
import { getAgenda } from "../services/contactServices.js";

const App = () => {
  const { state, dispatch } = useGlobalReducer();
  const [images, setImages] = useState("/michi_empresario.jpg");

  const navigate = useNavigate();

  useEffect(() => {
    const charactersData = async () => {
      try {
        const data = await getRickAndMortyData();

      await dispatch({type: "setRickAndMortyData", payload: data})
      /* if (data && data.results) {
        const images = data.results.map((char) => char.image);

        setImages(images);
      } */
     
      } catch (error) {
        
      }
      
    };
    const contactList = async () => {
      const theAgenda = await getAgenda(state.selectedAgenda);
      dispatch({ type: "setAgendaData", payload: theAgenda.contacts });
    };
    contactList();
    charactersData();
    
  }, []);

  const handleAddContact = () => {
    navigate("/createContact");
  };

  /* const getRandomImage = () => {
    //porque no podemos almacenar imagenes en la API
    if (images.length === 0) {
      return "https://placehold.co/100x100/cccccc/666666?text=Cargando...";
    }

    const randomNumber = Math.floor(Math.random() * images.length);
    return images[randomNumber];
  }; */

  return (
    <>
      <MyNavbar />
      <div>
        <div className="container mt-5">
          <div className="row mb-4">
            <div className="col text-end">
              <button className="btn btn-success" onClick={handleAddContact}>
                Add new contact
              </button>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              {state.agendaData.length === 0 ? (
                <h1>
                  No existen contactos en esta agenda <br />
                  ¡añade uno!
                </h1>
              ) : (
                state.agendaData.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    address={contact.address.split("||textoparaquenorompaelcodigoyhacersplit10294||")[0]}
                    phone={contact.phone}
                    email={contact.email}
                    img={contact.address.split("||textoparaquenorompaelcodigoyhacersplit10294||")[1]/*  || getRandomImage() */}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
