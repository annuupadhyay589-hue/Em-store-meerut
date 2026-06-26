const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: String,
  image: String
});

const Product = mongoose.model("Product", ProductSchema);

app.post("/login", (req, res) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/add-product", async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.json({ success: true });
});

app.get("/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

app.listen(process.env.PORT || 3000);
