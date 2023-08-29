import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [acceptExchange, setAcceptExchange] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <main className="container white">
      <div className="innerMain publish-container">
        <h1>Vends ton article</h1>

        <form className="publish-form-container" onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          />
          <h4>Titre</h4>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="ex: Chemise Sézane verte"
            onChange={(event) => {
              const value = event.target.value;
              setTitle(value);
            }}
          />
          <h4>Décris ton article</h4>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={description}
            placeholder="ex: porté quelquefois, taille correctement"
            onChange={(event) => {
              const value = event.target.value;
              setDescription(value);
            }}
          ></textarea>
          <h4>Marque</h4>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="ex: Zara"
            value={brand}
            onChange={(event) => {
              const value = event.target.value;
              setBrand(value);
            }}
          />
          <h4>Taille</h4>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="ex: L / 40 / 12"
            value={size}
            onChange={(event) => {
              const value = event.target.value;
              setSize(value);
            }}
          />
          <h4>Couleur</h4>
          <input
            type="text"
            id="color"
            name="color"
            placeholder="ex: Fushia"
            value={color}
            onChange={(event) => {
              const value = event.target.value;
              setColor(value);
            }}
          />
          <h4>Etat</h4>
          <input
            name="condition"
            id="condition"
            placeholder="Neuf avec étiquette"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          />
          <h4>Lieu</h4>
          <input
            name="city"
            id="city"
            placeholder="ex: Paris"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <h4>Prix</h4>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="0,00 €"
            value={price}
            onChange={(event) => {
              const value = event.target.value;
              setPrice(value);
            }}
          />
          <label htmlFor="exchange"></label>
          <span>
            <input
              type="checkbox"
              name="exchange"
              id="exchange"
              value={acceptExchange}
              onChange={() => setAcceptExchange(!acceptExchange)}
            />
            Je suis intéressé(e) par les échanges
          </span>
          <button type="submit" className="submit-button">
            Ajouter
          </button>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
