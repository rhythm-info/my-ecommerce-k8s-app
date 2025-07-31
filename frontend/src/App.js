import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the backend API base URL using an environment variable
  // Default to localhost:5000 for local npm start development,
  // but in Docker, REACT_APP_BACKEND_API will be injected as http://ecom-backend-container:5000
  const BACKEND_API_BASE_URL = process.env.REACT_APP_BACKEND_API || 'http://localhost:5000';


  useEffect(() => {
    // Construct the full API URL
    fetch(`${BACKEND_API_BASE_URL}/api/products`)
      .then(response => {
        if (!response.ok) {
          // This is a common place errors might occur if backend is unreachable or sends non-JSON
          throw new Error(`HTTP error! status: ${response.status} from ${response.url}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App">Loading products...</div>;
  }

  if (error) {
    return <div className="App">Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Our E-commerce Products</h1>
        <div className="product-list">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-card">
                <h2>{product.name}</h2>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>{product.description}</p>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;