import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import StarRating from "../../assets/starRating";

const Home = () => {
  const [products, setProducts] = useState([]);
<<<<<<< HEAD
  const [vitrines, setVitrines] = useState([]);
  const contentRefs = useRef([]);
=======
  const contentRef = useRef(null);

>>>>>>> b44feff (Implement the navbar and chage the button to add a new showcase)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
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
      .split(',')
      .map(id => products.find(product => product.id === parseInt(id)))
      .filter(product => product);
  };

  return (
    <>
      <div className="container">
<<<<<<< HEAD
        {vitrines.map((vitrine, index) => (
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
=======
        <h2> Ofertas feitas para você </h2>
        <div className="content" ref={contentRef}>
          {products.map((p) => (
            <div key={p.id}>
              <div className="product">
                <img src={p.image} alt="image" />
                <p>{p.title}</p>
                <div className="rating">
                  <StarRating rate={p.rating.rate} />
                  <p style={{ fontSize: "10px" }}>
                    {p.rating.rate} ({p.rating.count})
>>>>>>> b44feff (Implement the navbar and chage the button to add a new showcase)
                  </p>
                </div>
              ))}
            </div>
<<<<<<< HEAD
            <button
              className="scroll-button left"
              onClick={() => handleScroll(index, -100)}
            >
              &#10094;
            </button>
            <button
              className="scroll-button right"
              onClick={() => handleScroll(index, 100)}
            >
              &#10095;
            </button>
          </div>
        ))}
=======
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
>>>>>>> b44feff (Implement the navbar and chage the button to add a new showcase)
      </div>
    </>
  );
};

export default Home;
