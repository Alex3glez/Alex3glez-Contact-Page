const AGENDA_NAME = "";

export const createInitialState = () => {
  let almacenAgenda = "";

  almacenAgenda = localStorage.getItem(AGENDA_NAME) || "";

  return {
    agendaData: [],
    selectedAgenda: almacenAgenda,
    agendas: [],
    newContact: {},
  };
};

export const initialState = createInitialState();

export function storeReducer(state, action) {
  switch (action.type) {
    case "selectAgenda":
      localStorage.setItem(AGENDA_NAME, action.payload); // no entiendo la diferencia  (logica) entre setItem y getItem.

      return { ...state, selectedAgenda: action.payload };

    case "setAgendaData":
      return { ...state, agendaData: action.payload };

    case "setAgendasList":
      return { ...state, agendas: action.payload };

    case "setNewContact":
      return { ...state, newContact: action.payload };

    default:
      return state;
  }
}
