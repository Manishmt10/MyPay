require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainRouter = require("./Routes/index");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",mainRouter);

const PORT = process.env.PORT ;
app.listen(PORT,() => {
    console.log(`App is listening on port ${PORT}.`);
})
