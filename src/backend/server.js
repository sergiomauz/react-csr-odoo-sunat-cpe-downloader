import express from "express";
import bodyParser from "body-parser";
import { loadConfig } from "./configLoader.js"
import { OdooService } from "./infrastructure/odooService.js";
import { CpeController } from "./api/controllers.js";


const config = loadConfig();
const PORT = config.server.port || 3000;
const odooService = new OdooService(config);
const cpeController = new CpeController(odooService);
const app = express();


app.use(bodyParser.json());
// app.get("/api/query/cpe", cpeController.queryDocument);
// app.get("/api/download/xml/:id", cpeController.downloadXml);
// app.get("/api/download/cdr/:id", cpeController.downloadCdr);
// app.get("/api/download/pdf-a4/:ruc", cpeController.downloadPdfA4);
// app.get("/api/download/pdf-ticket/:ruc", cpeController.downloadPdfTicket);




app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto "${PORT}"`);
});
