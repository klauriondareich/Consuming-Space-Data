
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Launches from "./views/launches";

function App() {
  return (  

    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="launches" element={<Launches />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
