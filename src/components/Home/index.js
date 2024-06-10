import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import StarRating from "../../assets/starRating";

const Home = () => {
  const [products, setProducts] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const handleScroll = (scrollOffset) => {
    contentRef.current.scrollLeft += scrollOffset;
  };

  return (
    <>
      <div className="container">
        <h2> Ofertas feitas para você </h2>
        <div className="content" ref={contentRef}>
          {products.map((p) => (
            <div key={p.id}>
              <div className="product">
                <img src={p.image} alt="image" />
                <p>{p.title}</p>
                <div className="rating">
                  <StarRating rate={p.rating.rate} />
                  <p style={{fontSize: '10px'}}>
                    {p.rating.rate} ({p.rating.count})
                  </p>
                </div>
                <p>R$ {p.price}</p>
                <p style={{ fontSize: "12px", color: "green" }}>
                  (10% de desconto no pix)
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="scroll-button left"
          onClick={() => handleScroll(-100)}
        >
          &#10094;
        </button>
        <button
          className="scroll-button right"
          onClick={() => handleScroll(100)}
        >
          &#10095;
        </button>
        <button className="addShowcase">
          + Adicionar Vitrine
        </button>
      </div>
    </>
  );
};

export default Home;
