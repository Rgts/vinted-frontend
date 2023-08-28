import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="divHero">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button
              onClick={() => {
                navigate("/publish");
              }}
            >
              Commencer à vendre
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
