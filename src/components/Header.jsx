
import {Link} from "react-router-dom";

import logo from "../assets/images/logo-vinted.png"

const Header = ()=>{
return (
  <>
    <header className="innerHeader">
      <div className="container innerHeader">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="containerButtonHeader">
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  </>
);
}
export default Header
