import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"

// Import Routers
import router from "./Routers/router.js"

// Database Connection
import "./Database/connect.js"

const app = express();

// Dotenv
dotenv.config({ path: "./server/config.env" });
dotenv.config({ path: "./config.env" })
const port = process.env.PORT || 7000;

// CORS
const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions))

// Accepting formData in json form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Routers
app.use(router);

app.listen(port, () => {
    console.log(`Server is running at port ${port}\nLink: http://localhost:${port}`);
})