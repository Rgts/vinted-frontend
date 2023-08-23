import logo from "../assets/images/logo-vinted.png"

const Header = ()=>{
return (
  <>
    <header className="innerHeader">
      <div className="container innerHeader">
        <img src={logo} alt="logo" />
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
