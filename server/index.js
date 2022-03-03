const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const { router } = require("./router");
const { startServer } = require("./db.js");
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(router);

startServer()
  .then(
    app.listen(PORT, () =>
      console.log(`Server listening at http://localhost:${PORT} 🤯`)
    )
  )
  .catch((e) => console.error(e));
