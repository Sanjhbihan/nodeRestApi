const express = require('express');
const resource = require("./controllers/resourceController.js")
const cors = require('cors');
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000

const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))


app.get("/api/films", resource.films)

app.listen(port, () => {
    console.log("The list of films in the server")
});