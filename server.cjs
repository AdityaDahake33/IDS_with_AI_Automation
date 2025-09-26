const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let alerts = [];

app.post('/api/alerts', (req, res) => {
  const { timestamp, message, source } = req.body;

  if (!timestamp || !message || !source || !source.host) {
    return res.status(400).send('Invalid AI Report format');
  }

  const newAlert = {
    timestamp: timestamp,
    message: message,
    source: source.host,
    fullReport: req.body // Store the entire report for detailed view
  };

  alerts.push(newAlert);
  console.log('Alert received:', newAlert);
  res.status(200).send('Alert received');
});

app.get('/api/alerts', (req, res) => {
    res.json(alerts);
});

app.post('/api/block-ip', (req, res) => {
    console.log('Received request to block IP:', req.body);
    // Here you would implement the logic to block the IP address
    // For now, we'll just send a success response
    res.status(200).send('IP blocking request received successfully.');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});