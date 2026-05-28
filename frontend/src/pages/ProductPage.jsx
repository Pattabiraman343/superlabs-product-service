import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";

function ProductPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${slug}`);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={product.images[0]}
        alt={product.name}
        width="300"
      />

      <h1>{product.name}</h1>

      <h2>₹ {product.price}</h2>

      <p>{product.description}</p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Brand:</strong> {product.brand}
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <p>
        <strong>SKU:</strong> {product.sku}
      </p>
    </div>
  );
}

export default ProductPage;