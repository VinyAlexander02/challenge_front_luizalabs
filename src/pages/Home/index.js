import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import StarRating from "../../assets/starRating";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [vitrines, setVitrines] = useState([]);
  const contentRefs = useRef([]);

  const getProducts = async () => {
    try {
      const data = await fetch("https://fakestoreapi.com/products");
      const jsonData = await data.json();
      setProducts(jsonData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const storedVitrines = JSON.parse(localStorage.getItem("vitrines")) || [];
    setVitrines(storedVitrines);
  }, []);

  const handleScroll = (index, scrollOffset) => {
    contentRefs.current[index].scrollLeft += scrollOffset;
  };

  const getVitrineProducts = (productIds) => {
    return productIds
      .split(",")
      .map((id) => products.find((product) => product.id === parseInt(id)))
      .filter((product) => product);
  };

  return (
    <div className="container">
      {vitrines.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>Nenhuma vitrine cadastrada</h1>
      ) : (
        vitrines.map((vitrine, index) => (
          <div key={vitrine.id} className="vitrine-container">
            <h3>{vitrine.title}</h3>
            <div
              className="content"
              ref={(el) => (contentRefs.current[index] = el)}
            >
              {getVitrineProducts(vitrine.products).map((product) => (
                <div key={product.id} className="product">
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                  <div className="rating">
                    <StarRating rate={product.rating.rate} />
                    <p style={{ fontSize: "10px" }}>
                      {product.rating.rate} ({product.rating.count})
                    </p>
                  </div>
                  <p>R$ {product.price}</p>
                  <p style={{ fontSize: "12px", color: "green" }}>
                    (10% de desconto no pix)
                  </p>
                </div>
              ))}
            </div>
            <button
              data-testid={`scroll-button-left-${vitrine.id}`}
              className="scroll-button left"
              onClick={() => handleScroll(index, -100)}
            >
              &#10094;
            </button>
            <button
              data-testid={`scroll-button-right-${vitrine.id}`}
              className="scroll-button right"
              onClick={() => handleScroll(index, 100)}
            >
              &#10095;
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
