// import du package axios
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
            newsletter: false,
          }
        );
        console.log(response.data);
        if (response.data.token) {
          alert("token en cours");
          Cookies.set("token", response.data.token);
        } else {
          setErrorMessage("une erreur est survenue");
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
    <main className="container">
      <div className="innerMain">
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
          <div>{errorMessage}</div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </main>
  );
};

export default Signup;
