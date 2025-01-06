import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './App.css';

function App() {
  // State to store members data
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get('https://nodetester-g5ndv1if7-shubham13308s-projects.vercel.app/') // Your Vercel API URL
      .then((response) => {
        setMembers(response.data); // Set the data to the state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
        setError('Failed to load members'); // Set error message
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>Members List</h1>

        {loading ? (
          <p>Loading...</p> // Show loading message while data is being fetched
        ) : error ? (
          <p>{error}</p> // Show error message if fetching failed
        ) : (
          <ul>
            {members.length === 0 ? (
              <li>No members available</li> // Show this if no members were found
            ) : (
              members.map((member) => (
                <li key={member._id}>
                  <p>Name: {member.name}</p>
                  <p>Group: {member.group_name}</p>
                  <p>Amount: {member.amount}</p>
                  <p>Date: {new Date(member.date).toLocaleDateString()}</p>
                </li>
              ))
            )}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
