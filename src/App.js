import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="user-list">
        {filteredUsers.map((user, index) => (
          <li className="user-item" key={user.id}>
            <div className="user-avatar">
              <span className="user-id">{user.id}</span>
              <img src={user.avatar} alt={user.first_name} />
            </div>
            <span className="user-name">{user.first_name}</span>
            <span className="user-email">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;




