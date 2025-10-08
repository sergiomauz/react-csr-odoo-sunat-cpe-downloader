import { Router } from "express";
import {
  verificarRegistro,
  descargarZipA,
  descargarZipB,
  descargarPdfA,
  descargarPdfB,
} from "../controller.js";
import { validarRequest } from "../validators/requestValidator.js";

const router = Router();
router.route("/user-accounts").get();

router.route("/api/query/cpe").get(cpeController.queryDocument);
router.route("/api/download/xml/:id").get( cpeController.downloadXml);
router.route("/api/download/cdr/:id").get( cpeController.downloadCdr);
router.route("/api/download/pdf-a4/:ruc").get( cpeController.downloadPdfA4);
router.route("/api/download/pdf-ticket/:ruc").get( cpeController.downloadPdfTicket);


export function addRouters(app) {
  app.use("/",)
};
