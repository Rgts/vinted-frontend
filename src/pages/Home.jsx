// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main className="container innerMain">
      <div className="divOffers">
        {data.offers.map((offer) => {
          return (
            <article key={offer._id}>
              <div className="div-user">
                {"avatar" in offer.owner.account && (
                  <img
                    className="avatar"
                    src={offer.owner.account.avatar.url}
                    alt=""
                  />
                )}
                <div>{offer.owner.account.username}</div>
              </div>
              <img src={offer.product_image.url} alt="" />
              <div>{offer.product_price} €</div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
