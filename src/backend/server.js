import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { loadConfig } from "./configLoader.js"


const config = loadConfig();

// --------------------
// Servicio
// --------------------
class OdooService {
  constructor(config) {
    this.config = config;
  }

  getCompanyByRuc(ruc) {
    return this.config.companies.find(c => c.ruc === ruc);
  }

  async verifyInvoice(dto) {
    const company = this.getCompanyByRuc(dto.ruc);
    if (!company) throw new Error(`No existe empresa con RUC ${dto.ruc}`);

    const url = `${company.url}/verify`;
    const headers = { "x-api-key": company.apiKey };
    const body = {
      ruc: dto.ruc,
      serie: dto.serie,
      correlativo: dto.correlativo,
      fecha: dto.fecha,
      token: dto.token,
    };

    const response = await axios.post(url, body, { headers });
    return response.data;
  }

  async downloadZipA(ruc, correlativo) {
    const company = this.getCompanyByRuc(ruc);
    const url = `${company.url}/download/zipA/${correlativo}`;
    const headers = { "x-api-key": company.apiKey };
    const response = await axios.get(url, { headers, responseType: "arraybuffer" });
    return response.data;
  }

  async downloadZipB(ruc, correlativo) {
    const company = this.getCompanyByRuc(ruc);
    const url = `${company.url}/download/zipB/${correlativo}`;
    const headers = { "x-api-key": company.apiKey };
    const response = await axios.get(url, { headers, responseType: "arraybuffer" });
    return response.data;
  }

  async downloadPdfA(ruc, correlativo) {
    const company = this.getCompanyByRuc(ruc);
    const url = `${company.url}/download/pdfA/${correlativo}`;
    const headers = { "x-api-key": company.apiKey };
    const response = await axios.get(url, { headers, responseType: "arraybuffer" });
    return response.data;
  }

  async downloadPdfB(ruc, correlativo) {
    const company = this.getCompanyByRuc(ruc);
    const url = `${company.url}/download/pdfB/${correlativo}`;
    const headers = { "x-api-key": company.apiKey };
    const response = await axios.get(url, { headers, responseType: "arraybuffer" });
    return response.data;
  }
}

// --------------------
// Controlador
// --------------------
class InvoiceController {
  constructor(odooService) {
    this.odooService = odooService;
  }

  verifyInvoice = async (req, res) => {
    try {
      const dto = req.body;
      const result = await this.odooService.verifyInvoice(dto);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadZipA = async (req, res) => {
    try {
      const { ruc, correlativo } = req.params;
      const data = await this.odooService.downloadZipA(ruc, correlativo);
      res.setHeader("Content-Type", "application/zip");
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadZipB = async (req, res) => {
    try {
      const { ruc, correlativo } = req.params;
      const data = await this.odooService.downloadZipB(ruc, correlativo);
      res.setHeader("Content-Type", "application/zip");
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadPdfA = async (req, res) => {
    try {
      const { ruc, correlativo } = req.params;
      const data = await this.odooService.downloadPdfA(ruc, correlativo);
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadPdfB = async (req, res) => {
    try {
      const { ruc, correlativo } = req.params;
      const data = await this.odooService.downloadPdfB(ruc, correlativo);
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

// --------------------
// App Express
// --------------------
const odooService = new OdooService(config);
const invoiceController = new InvoiceController(odooService);

const app = express();
app.use(bodyParser.json());

app.post("/api/invoices/verify", invoiceController.verifyInvoice);
app.get("/api/invoices/download/zipA/:ruc/:correlativo", invoiceController.downloadZipA);
app.get("/api/invoices/download/zipB/:ruc/:correlativo", invoiceController.downloadZipB);
app.get("/api/invoices/download/pdfA/:ruc/:correlativo", invoiceController.downloadPdfA);
app.get("/api/invoices/download/pdfB/:ruc/:correlativo", invoiceController.downloadPdfB);

// --------------------
// Iniciar servidor
// --------------------
const PORT = config.server.port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
