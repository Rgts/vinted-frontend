// import du package axios
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
const Signup = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            username: username,
            email: email,
            password: password,
            newsletter: newsletter,
          }
        );
        console.log(response.data);
        if (response.data.token) {
          // alert("token en cours");
          Cookies.set("token", response.data.token);
          setToken("token");
          navigate("/");
        } else {
          setErrorMessage("Une erreur est survenue.");
        }
      } catch (error) {
        if (error.response.status === 409) {
          setErrorMessage("Ce compte existe déjà chez nous !");
        }
      }
    };
    fetchData();
  };

  return (
    <main className="container white">
      <div className="innerMain signup-container">
        <h1>S'inscrire</h1>
        <form className="signup-form-container" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            type="text"
            name="username"
            value={username}
            onChange={handleNameChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span>
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              value={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
            S'inscrire à notre newsletter.
          </span>

          <div className="signup-disclaimer">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </div>
          <div className="error-message">{errorMessage}</div>
          <input className="submit-button" type="submit" value="S'inscrire" />
        </form>
        <div className="message-under-submit">
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
