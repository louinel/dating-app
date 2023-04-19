import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cors from "cors";
import Cards from "./dbCards.js";

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const connection_url = process.env.MONGODB_URI;

// Middlewares
app.use(express.json());
app.use(Cors());

// Database Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello web dev!!!");
});

app.post("/dating/cards", async (req, res) => {
  const card = new Cards({
    name: req.body.name,
    imgUrl: req.body.imgUrl,
  });

  try {
    const newCard = await card.save();
    res.status(201).send(newCard);
  } catch (error) {
    res.status(500).send(error);
  }

});

app.get("/dating/cards", async (req, res) => {
  try {
    const cards = await Cards.find();
    res.status(200).send(cards);
  } catch (err){
    res.status(500).send(err);
  }
})

// Listener
app.listen(port, () => console.log(`Listening on port ${port}`));
