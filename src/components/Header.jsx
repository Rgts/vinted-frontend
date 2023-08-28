import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo-vinted.png";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="innerHeader">
        <div className="container innerHeader">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="container-button-header">
            {token ? (
              <button
                style={{
                  background: "red",
                  color: "white",
                  border: "1px solid red",
                }}
                onClick={() => {
                  Cookies.remove("token");
                  setToken(null);
                }}
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <button onClick={() => navigate("/signup")}>S'inscrire</button>
                <button onClick={() => navigate("/login")}>Se connecter</button>
              </>
            )}
            <button onClick={() => navigate("/publish")}>
              Vends tes articles
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
