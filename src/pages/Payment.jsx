// import du package axios
// import axios from "axios";
// import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Stripe payment imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ token }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { title, price } = location.state;

  const protectionPrice = 5;
  const deliveryPrice = 0.1 * price;
  const totalPrice = price + protectionPrice + deliveryPrice;

  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  return (
    <>
      {token ? (
        <>
          <main>
            <div className="innerMain payment-container">
              <p>Résumé de la commande</p>
              <div className="payment-details">
                <div className="payment-line-detail">
                  <p>Commande</p>
                  <p>{Number(price).toFixed(2)} €</p>
                </div>
                <div className="payment-line-detail">
                  <p>Frais protection acheteurs</p>
                  <p>{Number(protectionPrice).toFixed(2)} €</p>
                </div>
                <div className="payment-line-detail">
                  <p>Frais de port</p>
                  <p>{Number(deliveryPrice).toFixed(2)} €</p>
                </div>
                <div className="payment-line-detail">
                  <p>Total</p>
                  <p>{Number(totalPrice).toFixed(2)} €</p>
                </div>
                <div>
                  Il ne vous reste plus qu'un étape pour vous offrir {title}.
                  Vous allez payer {Number(totalPrice).toFixed(2)} € (frais de
                  protection et frais de port inclus).
                  <hr className="gray-line" />
                  <Elements stripe={stripePromise}>
                    <CheckoutForm title={title} totalPrice={totalPrice} />
                  </Elements>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default Payment;
