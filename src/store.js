export const initialState= {
    agendaData:[],
    selectedAgenda:"",
    agendas:[],
    newContact:{}
}


export function storeReducer(state, action) {

    switch (action.type) {
        case "selectAgenda":
            return {...state, selectedAgenda: action.payload};

        case "setAgendaData": 
            return {...state, agendaData: action.payload};

        case "setAgendasList": 
            return {...state, agendas: action.payload};

        case "setNewContact": 
            return {...state, newContact: action.payload};
    
        default:
           return state;
    }
    
}

