import React, { useEffect, useState } from "react";

const API_URL = "https://module4-project-2.onrender.com/api/products/";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  // Get products
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Start update
  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}${editingProduct.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            price: price,
            brand: brand,
          }),
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProduct.id
              ? updatedProduct
              : product
          )
        );

        setEditingProduct(null);
        setName("");
        setPrice("");
        setBrand("");
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>

      {/* Update Form */}
      {editingProduct && (
        <form onSubmit={handleUpdate}>
          <h3>Update Product</h3>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />

          <button type="submit">Save Update</button>

          <button
            type="button"
            onClick={() => setEditingProduct(null)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Product List */}
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>Price: ₹{product.price}</p>

          <p>{product.brand}</p>

          <button onClick={() => handleEdit(product)}>
            Update
          </button>

          <button onClick={() => handleDelete(product.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default ProductList;