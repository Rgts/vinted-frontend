// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
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
    <main>
      <div className="container innerMain">
        <div className="divOffers">
          {data.offers.map((offer) => {
            return (
              <Link key={offer._id} to={`/offer/${offer._id}`}>
                <article>
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
                  <div className="product-price">{offer.product_price} €</div>
                  <div className="product-detail">
                    {offer.product_details[1].TAILLE}
                  </div>
                  <div className="product-detail">
                    {offer.product_details[2].ÉTAT}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
