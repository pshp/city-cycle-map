const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;
const cors = require('cors');
const { router } = require('./router');
const { startServer } = require('./db');

app.use(cors());
app.use(express.json());
app.use(router);

startServer()
  .then(
    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT} 🤯`)),
  )
  .catch((e) => console.error(e));
