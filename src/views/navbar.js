import { Link } from "react-router-dom";

const Navbar = () => {

    return  <nav>
                <ul>
                    <li>
                        <Link to="/">Welcome in Space World</Link>
                    </li>
                    <li>
                        <Link to="/launches">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/all_launches">Tous les lancements</Link>
                    </li>
                </ul>
             </nav>
   
}

export default Navbar