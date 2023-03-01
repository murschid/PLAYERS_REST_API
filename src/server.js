const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./router");

const app = express();
app.use(cors());
app.use(morgan("dev"));
dotenv.config();
app.use(express.json());

// Routers
app.get("/", (req, res) => {
	res.status(200).json({status: 'ok'});
});

app.use("/api", router);



const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is listening on PORT ${port}`);
});