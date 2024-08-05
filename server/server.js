const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data"); // Import form-data for correct formatting
const path = require("path");
const fs = require("fs");

// Initialize the Express app
const app = express();
const port = 5000;

// Set up CORS
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/predict", upload.single("imagefile"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const form = new FormData();
    form.append("imagefile", fs.createReadStream(req.file.path)); // Use 'imagefile' here

    const response = await axios.post("http://localhost:5001/predict", form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error connecting to Flask server:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Failed to get prediction from Flask server" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
