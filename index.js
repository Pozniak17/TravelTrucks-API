import "dotenv/config";
import express from express

import "./db.js";

const PORT = 8080;

const app = express();

app.use("/", routes)

app.use((req, res, next) => {
  res.status(404).send("Not found")
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).send("Internal server error")
})

app.listen(8080, () => {
  console.log(`Server started on port ${PORT}`)
})