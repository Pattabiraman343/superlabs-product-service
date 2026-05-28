import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const fetchProducts = async (
    keyword = "",
    currentPage = 1
  ) => {
    try {
      const { data } = await API.get(
        `/products?q=${keyword}&page=${currentPage}&limit=6`
      );

      setProducts(data.products);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(search, page);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);

    fetchProducts(search, 1);
  };

  const handleReset = () => {
    setSearch("");

    setPage(1);

    fetchProducts("", 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Listing</h1>

      <form
        onSubmit={handleSearch}
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "10px",
            width: "300px",
          }}
        />

        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px",
          }}
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            marginLeft: "10px",
            padding: "10px",
          }}
        >
          Reset
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              width="100%"
              height="200"
            />

            <h3>{product.name}</h3>

            <p>₹ {product.price}</p>

            <Link
              to={`/product/${product.slug}`}
            >
              View Product
            </Link>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;