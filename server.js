// Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// Initialize the Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory data storage for Shop Items
let shopItems = [];
let nextId = 1;

// Routes

// Get all Shop Items
app.get("/items", (req, res) => {
  res.json(shopItems);
});

// Get a single Shop Item by ID
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = shopItems.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

// Create a new Shop Item
app.post("/items", (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !description || price === undefined || stock === undefined) {
    return res.status(400).json({ error: "Name, description, price, and stock are required" });
  }
  const newItem = { id: nextId++, name, description, price, stock };
  shopItems.push(newItem);
  res.status(201).json(newItem);
});

// Update a Shop Item by ID
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, price, stock } = req.body;
  const item = shopItems.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (name !== undefined) item.name = name;
  if (description !== undefined) item.description = description;
  if (price !== undefined) item.price = price;
  if (stock !== undefined) item.stock = stock;

  res.json(item);
});

// Delete a Shop Item by ID
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = shopItems.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  shopItems.splice(itemIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
