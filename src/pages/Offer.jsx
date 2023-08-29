import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <main>
      <div className="container div-article">
        <div className="div-article-left">
          {/* <div>{data.product_name}</div> */}
          <img src={data.product_pictures[0].url} alt="" />
        </div>

        <div className="div-article-right">
          <div className="product-price">{data.product_price} €</div>
          {data.product_details.map((obj, idx) => {
            return (
              <div key={idx} className="product-detail">
                <span>{Object.keys(obj)}</span>
                <span>{Object.values(obj)}</span>
              </div>
            );
          })}
          <div className="product-name">{data.product_name}</div>
          <div>{data.product_description}</div>
          <hr className="gray-line" />
          <button
            onClick={() =>
              navigate("/payment", {
                state: { title: data.product_name, price: data.product_price },
              })
            }
          >
            Acheter
          </button>
        </div>
      </div>
    </main>
  );
};

export default Publish;
