require("./config/mongoose");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const productV1 = require("./app/products_v1/routes");
const productV2 = require("./app/product_v2/routes");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use("/public", express.static("uploads/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", productV1);
app.use("/api/v2", productV2);
app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
