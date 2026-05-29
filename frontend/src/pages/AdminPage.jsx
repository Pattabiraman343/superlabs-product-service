import { useEffect, useState } from "react";
import "./AdminPage.css";
import API from "../services/api";

function AdminPage() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    sku: "",
    image: "",
    category: "",
    brand: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      price: "",
      sku: "",
      image: "",
      category: "",
      brand: "",
      stock: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: Number(formData.price),
        sku: formData.sku,
        images: [formData.image],
        category: formData.category,
        brand: formData.brand,
        stock: Number(formData.stock),
      };

      if (editingId) {
        await API.put(`/products/${editingId}`, payload);

        alert("Product Updated Successfully");
      } else {
        await API.post("/products", payload);

        alert("Product Created Successfully");
      }

      resetForm();

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      sku: product.sku,
      image: product.images[0],
      category: product.category,
      brand: product.brand,
      stock: product.stock,
    });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">
        Admin Product Management
      </h1>
  
      <form
        onSubmit={handleSubmit}
        className="admin-form"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="admin-input"
        />
  
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="admin-input"
        />
  
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="admin-textarea"
        />
  
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="admin-input"
        />
  
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="admin-input"
        />
  
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="admin-input"
        />
  
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="admin-input"
        />
  
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="admin-input"
        />
  
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="admin-input"
        />
  
        <button
          type="submit"
          className="submit-btn"
        >
          {editingId
            ? "Update Product"
            : "Create Product"}
        </button>
      </form>
  
      <h2 className="product-list-title">
        Product List
      </h2>
  
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
  
                <td>{product.name}</td>
  
                <td>
                  ₹ {product.price}
                </td>
  
                <td>
                  {product.category}
                </td>
  
                <td>{product.stock}</td>
  
                <td>
                  <button
                    onClick={() =>
                      handleEdit(product)
                    }
                    className="action-btn edit-btn"
                  >
                    Edit
                  </button>
  
                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="action-btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;