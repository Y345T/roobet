const axios = require('axios');

module.exports = async (req, res) => {
  // Ensure that the API key is available
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    // Make a request to the Roobet API
    const response = await axios.get('https://roobetconnect.com/affiliate/v2/stats', {
      params: { userId: '2f895361-12b5-4266-b578-a10ea2c36895' },
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Send the response data back to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors from the Roobet API request
    const statusCode = error.response ? error.response.status : 500;
    const errorMessage = error.response ? error.response.data : error.message;
    res.status(statusCode).json({ error: errorMessage });
  }
};
