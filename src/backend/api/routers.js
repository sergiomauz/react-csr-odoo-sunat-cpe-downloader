import { Router } from "express";
import { OdooService } from "../infrastructure/odooService.js";
import { CpeController } from "./controllers.js";


export function addRouters(app, config) {
  const odooService = new OdooService(config);
  const cpeController = new CpeController(odooService, config);

  const router = Router();
  router.route("/api/query/cpe").post(cpeController.queryDocument);
  router.route("/api/download/xml/:id").get( cpeController.downloadXml);
  router.route("/api/download/cdr/:id").get( cpeController.downloadCdr);
  router.route("/api/download/pdf-a4/:id").get( cpeController.downloadPdfA4);
  router.route("/api/download/pdf-ticket/:id").get( cpeController.downloadPdfTicket);

  app.use("/", router);
};
