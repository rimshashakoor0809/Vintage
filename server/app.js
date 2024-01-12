require("./init");
require("./database");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const log = require("./logger");


// Import Routes

const authRoute = require("./routes/auth/index");
const userRoute = require("./routes/user/index");
const sellerRoute = require("./routes/seller/index");
const productRoute = require("./routes/product/index")

const port = process.env.PORT || 1122;
const app = express();

// middleware
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  exposedHeaders: ["Authorization"]
}));
app.use("/", express.static("uploads"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


// Routes

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/product", productRoute);


// global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    message,
    stack: err.stack,
    success: false
  })
})

// server started
app.listen(port, () => {
  log.info(`server is listening on port: ${port}`)
})
