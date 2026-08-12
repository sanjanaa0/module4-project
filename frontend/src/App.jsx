import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const getProducts = () => {
    fetch("https://module4-project.onrender.com/api/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = (e) => {
    e.preventDefault();

    fetch("https://module4-project.onrender.com/api/products/", {
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

  return (
    <div>
      <h1>Product Management</h1>

      <form onSubmit={addProduct}>
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

        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;