console.log("server is running hello!!")

import express from "express";
const app = express();


app.get("/", (req, res)=> {
res.send("Hello server")
}
)
app.listen(3001);

