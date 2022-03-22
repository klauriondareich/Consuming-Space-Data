
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Launches from "./views/launches";
import ViewLaunch from "./views/viewLaunch";

function App() {
  return (  

    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="launches" element={<Launches />} />
          <Route path="launches/:id" element={<ViewLaunch />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
