import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ title, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    const response = await axios.post(
      " https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        amount: totalPrice,
        title: title,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement className="stripe-elements" />
          <button className="pay-button" type="submit">
            Pay
          </button>
        </form>
      ) : (
        <span>Merci pour votre achat. </span>
      )}
    </>
  );
};

export default CheckoutForm;
