import React, { useState, useEffect } from 'react';
import Login from './Companents/Auth/Login';
import AdminDashboard from './Companents/Dashboard/Admin_Dashboard';
import EmployeeDashboard from './Companents/Dashboard/Employee_Dashboard';
import axios from 'axios'; // Keep axios for fetching alerts

function App() {
  // Authentication state and logic
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);

      // Add expiration check
      const currentTime = new Date().getTime();
      const isSessionValid = userData.expires && currentTime < userData.expires;

      if (isSessionValid) {
        setUser(userData.role);
        setLoggedInUserData(userData.data);
      } else {
        localStorage.removeItem('loggedInUser'); // Clear invalid session
      }
    }
  }, []);

  const handleLogin = (role, userData) => {
    setUser(role);
    setLoggedInUserData(userData);
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
    if (role === 'admin') {
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: userData, expires: expirationTime }));
    } else if (role === 'employee') {
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: userData, expires: expirationTime }));
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedInUserData(null);
    localStorage.removeItem('loggedInUser');
  };

  // Snort Alerts state and logic
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/alerts');
        setAlerts(response.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    // Fetch alerts immediately and then every 5 seconds
    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Conditional rendering based on authentication and then display alerts
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }
  if (user === 'admin') {
    return (
      <AdminDashboard onLogout={handleLogout}>
        {/* Display Snort Alerts within Admin Dashboard */}
        <div className="snort-alerts-section">
          <h1>Snort Alerts</h1>
          <div className="alerts-list">
            {alerts.length === 0 ? (
              <p>No alerts received yet.</p>
            ) : (
              <ul>
                {alerts.map((alert) => (
                  <li key={alert.id}>
                    <strong>Timestamp:</strong> {new Date(alert.timestamp).toLocaleString()} <br />
                    <strong>Message:</strong> {alert.message} <br />
                    <strong>Source Host:</strong> {alert.source.host}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </AdminDashboard>
    );
  }
  if (user === 'employee') {
    return (
      <EmployeeDashboard user={loggedInUserData} onLogout={handleLogout}>
        {/* Display Snort Alerts within Employee Dashboard */}
        <div className="snort-alerts-section">
          <h1>Snort Alerts</h1>
          <div className="alerts-list">
            {alerts.length === 0 ? (
              <p>No alerts received yet.</p>
            ) : (
              <ul>
                {alerts.map((alert) => (
                  <li key={alert.id}>
                    <strong>Timestamp:</strong> {new Date(alert.timestamp).toLocaleString()} <br />
                    <strong>Message:</strong> {alert.message} <br />
                    <strong>Source Host:</strong> {alert.source.host}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </EmployeeDashboard>
    );
  }
  return null;
}

export default App;