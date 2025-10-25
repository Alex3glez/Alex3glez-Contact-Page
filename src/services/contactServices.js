export const getAgendas = async() => {
    try {
        const request= await fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100");
        const response = await request.json();
        return response;
    } catch (error) { console.log(error);
    
        
    }
  }

  
  export const getAgenda = async(name) => {
    try {
        const request= await fetch(`https://playground.4geeks.com/contact/agendas/${name}`);
        const response= await request.json();
        return response;
    } catch (error) { console.log(error);
    
        
    }
  }

  export const deleteAgenda = async(name) => {
    try {
        const request = await fetch(`https://playground.4geeks.com/contact/agendas/${name}?tags=Agenda%20operations&summary=Delete%20Agenda.&description=Deletes%20a%20specific%20agenda%20from%20the%20database.`, {
            method: "DELETE",
            headers: {'accept': 'application/json'}}
        )
        if (!request.ok) {
            throw new error(request.statusText)
        
        }
                
    } catch (error) { throw error;
    
        
    }
  }

  export const createAgenda = async(name) => {
    try {
        const request= await fetch(`https://playground.4geeks.com/contact/agendas/${name}`,{
            method: "POST",
            headers: {'accept': 'application/json'},
            body:""
        })
        if (!request.ok) {
            throw new error(request.statusText)
        
        }

        return request;
                
    } catch (error) { throw error;
    
        
    }
  }

  export const createAgendaContact = async(agendaName, newContact) => {
    try {
        const request=await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts`,{
            method: "POST",
            headers: {'accept': 'application/json',
                'content-type': 'application/json'},
            body: JSON.stringify(newContact) 
            })
            return request;
    } catch (error) { console.log(error);
    
        
    }
  }

  export const updateAgendaContact = async(agendaName, contactId, contactUpdates) => {
    try {
        const request= await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${contactId}`,{
            method: "PUT",
            headers:{
                'accept': 'application/json',
                'content-type': 'application/json'},
                body: JSON.stringify(contactUpdates)//si en el objeto contactUpdates existe algúna propiedad undefined, con stringify no se incluye por lo que en la api se queda el valor anterior.
            }
        )
        const response = await request.json();
        console.log(response)
    } catch (error) {
        
    }
  }
  
 export const deleteAgendaContact = async(agendaName, contactId) => {
    try {
        const request=await fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}/contacts/${contactId}`,{
            method: "DELETE",
            headers: {'accept': 'application/json'}
        })
        if (!request.ok) {
            throw new error(request.statusText)
        
        }
    } catch (error) { throw error;
        
    }
 }


