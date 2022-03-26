
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import Launches from "./views/launches";
import ViewLaunch from "./views/viewLaunch";
import AllLaunches from "./views/allLaunches";
import Navbar from "./views/navbar"

function App() {
  return (  

    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="launches" element={<Launches />} />
          <Route path="launches/:id" element={<ViewLaunch />} />
          <Route path="all_launches" element={<AllLaunches />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
