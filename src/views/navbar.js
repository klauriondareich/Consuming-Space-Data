import { NavLink } from "react-router-dom";

const Navbar = () => {

    return  <nav>
                <ul>
                    <li>
                        <NavLink to="/">Welcome in Space World </NavLink>
                    </li>
                    <li>
                        <NavLink to="/launches">Accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/all_launches">Tous les lancements</NavLink>
                    </li>
                </ul>
             </nav>
   
}

export default Navbar