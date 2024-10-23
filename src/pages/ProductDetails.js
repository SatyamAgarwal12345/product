import React, { useEffect, useState } from "react";
import { fetchProductById } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import '../App.css'

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(productId);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        product && (
          <div>
            <img src={product.images[0]} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {product.discountPercentage && (
              <p>Discount: {product.discountPercentage}%</p>
            )}
            <p>Rating: {product.rating}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
