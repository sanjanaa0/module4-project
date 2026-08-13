import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const getProducts = () => {
    fetch("https://module4-project-2.onrender.com/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Add Product
  const addProduct = (e) => {
    e.preventDefault();

    fetch("https://module4-project-2.onrender.com/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: price,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setName("");
        setPrice("");
        setDescription("");
        getProducts();
      })
      .catch((error) => console.error(error));
  };

  // Delete Product
  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    fetch(`https://module4-project-2.onrender.com/api/products/${id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          getProducts();
        } else {
          alert("Delete failed");
        }
      })
      .catch((error) => console.error(error));
  };

  // Start Update
  const startUpdate = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  // Update Product
  const updateProduct = (e) => {
    e.preventDefault();

    fetch(
      `https://module4-project-2.onrender.com/api/products/${editingId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        setEditingId(null);
        setName("");
        setPrice("");
        setDescription("");
        getProducts();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Product Management</h1>

      <form onSubmit={editingId ? updateProduct : addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setPrice("");
              setDescription("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Product List</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>

          <p>Price: ₹{product.price}</p>

          <p>{product.description}</p>

          <button onClick={() => startUpdate(product)}>
            Update
          </button>

          <button onClick={() => deleteProduct(product.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;