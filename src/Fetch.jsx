import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/user/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message); // Set error state on fetch failure
    }
  };

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetch fails
  }

  return (
    <div>
      <h2>Data from Backend:</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {/* Display data however you need */}
            {item.last_name} {item.first_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetchingComponent;
