// import du package axios
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

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
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        if (response.data.token) {
          // alert("token en cours");
          Cookies.set("token", response.data.token);
          setToken(response.data.token);
          navigate("/");
        } else {
          setErrorMessage("une erreur est survenue");
        }
      } catch (error) {
        setErrorMessage(error.response);
      }
    };
    fetchData();
  };

  return (
    <main className="container white">
      <div className="innerMain login-container">
        <h1>Se connecter</h1>
        <form className="login-form-container" onSubmit={handleSubmit}>
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
          <div className="error-message">{errorMessage}</div>
          <input className="submit-button" type="submit" value="Se connecter" />
        </form>
      </div>
    </main>
  );
};
export default Login;
