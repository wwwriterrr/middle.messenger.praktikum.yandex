import express from "express";
import ViteExpress from "vite-express";
const app = express();
const port = 3000;


const base_dir = process.cwd();

app.get("/", (req, res) => {
    res.sendFile( `${base_dir}/`);
});

ViteExpress.listen(app, port, () => console.log("Server is listening..."));
