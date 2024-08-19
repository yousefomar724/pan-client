import React, { useState, useEffect } from "react";
import FlipPage from "react-flip-page";
import "./book.css";
import axios from "../services/axios";

const Book = () => {
  const [products, setProducts] = useState([]);
  const itemsPerPage = 4; // عدد المنتجات في كل صفحة

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  const renderSectionPages = (section) => {
    const filteredProducts = products.filter(
      (product) => product.sections === section
    );
    const pages = [];

    if (filteredProducts.length === 0) {
      pages.push(
        <article key={section} className="demoPage">
          <h1>{section}</h1>
          <div className="book-coming-soon">قريباً</div>
        </article>
      );
    } else {
      for (let i = 0; i < filteredProducts.length; i += itemsPerPage) {
        const currentPageItems = filteredProducts.slice(i, i + itemsPerPage);
        pages.push(
          <article key={i} className="demoPage">
            <h1>{section}</h1>
            <div className="book-items-container">
              {currentPageItems.map((product) => (
                <div key={product._id} className="book-item">
                  <h2>{product.name}</h2>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="book-item-image"
                  />
                  <p>السعر: {product.price} SR</p>
                  <p>السعرات الحرارية: {product.calories} kcal</p>
                </div>
              ))}
            </div>
          </article>
        );
      }
    }

    return pages;
  };

  return (
    <div className="book-container">
      <FlipPage
        orientation="horizontal"
        width={400}
        height={600}
        showSwipeHint
        uncutPages
      >
        {renderSectionPages("سندويتشات")}
        {renderSectionPages("صوصات")}
        {renderSectionPages("عصيرات")}
        {renderSectionPages("فطور")}
      </FlipPage>
    </div>
  );
};

export default Book;
