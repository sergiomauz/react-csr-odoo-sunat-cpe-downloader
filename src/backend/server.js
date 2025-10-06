import express from "express";
import fs from "fs";
import YAML from "yaml";
import path from "path";

//
const configPath = path.resolve("config.yaml");
const file = fs.readFileSync(configPath, "utf8");
const config = YAML.parse(file);

//
const port = config.server.port;
const app = express();
app.get("/", (req, res) => {
  res.send(`Hola mundo desde el puerto ${port}!`);
});
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
