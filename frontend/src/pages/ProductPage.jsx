import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";

function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] =
    useState(null);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(
        `/products/${slug}`
      );

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          maxWidth: "1000px",
          width: "100%",
          borderRadius: "20px",
          padding: "30px",
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "40px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: "100%",
              height: "450px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </div>

        <div>
          <h1
            style={{
              fontSize: "40px",
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            {product.name}
          </h1>

          <h2
            style={{
              fontSize: "32px",
              color: "#2563eb",
              marginBottom: "20px",
            }}
          >
            ₹ {product.price}
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "28px",
              color: "#4b5563",
              marginBottom: "25px",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontSize: "17px",
            }}
          >
            <p>
              <strong>
                Category:
              </strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>
                Brand:
              </strong>{" "}
              {product.brand}
            </p>

            <p>
              <strong>
                Stock:
              </strong>{" "}
              {product.stock}
            </p>

            <p>
              <strong>SKU:</strong>{" "}
              {product.sku}
            </p>
          </div>

          <button
            style={{
              marginTop: "30px",
              padding:
                "14px 24px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;