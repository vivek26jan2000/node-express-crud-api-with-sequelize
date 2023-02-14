const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/productRouter.js");
const reviewRouter = require("./routes/reviewRouter.js");

const app = express();

// middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers

app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
//port

const PORT = process.env.PORT || 8080;

//server

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
