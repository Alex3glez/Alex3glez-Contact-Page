import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./pages/App";

 export const router= createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index  element={<App />}/>

        </Route>
    )
)