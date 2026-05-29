import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

import "./HomePage.css";

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
    <div className="home-container">
      <h1 className="home-title">
        Product Listing
      </h1>

      <form
        onSubmit={handleSearch}
        className="search-form"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-input"
        />

        <button
          type="submit"
          className="btn search-btn"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn reset-btn"
        >
          Reset
        </button>
      </form>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image" style={{width:"330px",height:"200px"}}
            />

            <div className="product-content">
              <h3 className="product-name">
                {product.name}
              </h3>

              <p className="product-price">
                ₹ {product.price}
              </p>

              <Link
                to={`/product/${product.slug}`}
                className="view-btn"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="page-btn"
        >
          Previous
        </button>

        <span className="page-text">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(page + 1)
          }
          className="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;