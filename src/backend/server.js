import express from "express";
import bodyParser from "body-parser";
import { loadConfig } from "./configLoader.js"
import { addRouters } from "./api/routers.js";


const config = loadConfig();
const port = config.server.port || 3000;
const app = express();

app.use(bodyParser.json());
addRouters(app, config);
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto "${port}"`);
});
