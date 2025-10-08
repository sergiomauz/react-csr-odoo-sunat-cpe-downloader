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

// POST - Verificar existencia
router.post("/verificar", validarRequest, verificarRegistro);

// GET - Descargar archivos
router.get("/descargar/zip-a", descargarZipA);
router.get("/descargar/zip-b", descargarZipB);
router.get("/descargar/pdf-a", descargarPdfA);
router.get("/descargar/pdf-b", descargarPdfB);

export default router;
