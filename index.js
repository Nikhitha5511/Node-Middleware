const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

app.use((req, res, next) => {
  const startTime = new Date();

  accessLogStream.write(`[${startTime}] ${req.method} ${req.url}\n`);

  res.on("finish", () => {
    const endTime = new Date();
    const processingTime = endTime - startTime;
    accessLogStream.write(`[${endTime}] Request processed in ${processingTime}ms\n`);
  });

  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: "John Doe", email: "john@example.com" });
});

app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 39.99 }
  ];
  res.json(products);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
