const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000
const app = express();

app.use('/', express.static(path.join(__dirname + '/dist')))

// Serve the files on port 3000.
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log("Press Ctrl+C to quit.")
})
