import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./pages/Home";
import CreateContact from "./pages/CreateContact";
import Login from "./pages/Login";
import AgendaManaging from "./pages/AgendaManaging";

 export const router= createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" >
            <Route index element={<Login/>}/>
            <Route path="createContact" element={<CreateContact/>} />
            <Route path="home"  element={<App />}/>
            <Route path="agendaManaging" element={<AgendaManaging/>} />

            
            

        </Route>
    )
)