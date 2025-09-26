import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NetworkAnalysis = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [lastAlertCount, setLastAlertCount] = useState(0);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/alerts"
      );
      setAlerts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setError("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && !error && alerts.length > lastAlertCount) {
      setShowPopup(true);
      setLastAlertCount(alerts.length);
    }
  }, [loading, error, alerts, lastAlertCount]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="network-analysis p-6">
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Alert on Admin Dashboard</h2>
            <p className="text-gray-700 mb-6">
              New network alerts have been detected. Please review the dashboard for details.
            </p>
            <button
              onClick={closePopup}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <h1 className="text-xl font-bold mb-4">Network Analysis Dashboard</h1>
      
      {loading && <p className="text-gray-500">Loading alerts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.length === 0 && !loading && !error ? (
          <p className="col-span-full text-gray-600">No alerts received yet.</p>
        ) : (
          alerts.map((alert, index) => (
            <div key={index} className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="p-2 border rounded-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Alert Message</h3>
                    <p className="text-gray-800 font-medium">{alert.message}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-2 border rounded-md">
                        <h4 className="text-base font-semibold text-gray-900 mb-1">Timestamp</h4>
                        <p className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="p-2 border rounded-md">
                        <h4 className="text-base font-semibold text-gray-900 mb-1">Source Host</h4>
                        <p className="text-gray-600 text-sm">{alert.source}</p>
                    </div>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NetworkAnalysis;