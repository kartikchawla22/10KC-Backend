const express = require("express");
const db = require("./utils/database");
const app = express();
const port = 8000;
const v1Routes = require("./routes/v1/routes");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", v1Routes);

db.then((database) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch(console.log);