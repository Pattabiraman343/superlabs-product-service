import { useEffect, useState } from "react";

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
    <div style={{ padding: "20px" }}>
      <h1>Admin Product Management</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "500px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Create Product"}
        </button>
      </form>

      <h2>Product List</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
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
                  width="80"
                />
              </td>

              <td>{product.name}</td>

              <td>₹ {product.price}</td>

              <td>{product.category}</td>

              <td>{product.stock}</td>

              <td>
                <button
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;