const express = require('express');
const routes = require('./routes/index.js');
const cors = require('cors');

const app = express();
const port = 5500;

app.set('etag', false);
app.use(cors());

app.use('/api/ocp-vulnerability/v1/', routes);

app.listen(port, () => {
  console.log(`Mock server running on port ${port}`);
});
