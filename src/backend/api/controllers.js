export class CpeController {
  constructor(odooService, config) {
    this.odooService = odooService;
    this.config = config;
  }

  queryDocument = async (req, res) => {
    try {
      // const dto = req.body;
      // const result = await this.odooService.verifyInvoice(dto);
      res.json(`{ message: ${this.config.companies[0].name} }`);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadXml = async (req, res) => {
    try {
      const { ruc, correlativo } = req.params;
      const data = await this.odooService.downloadZipA(ruc, correlativo);
      res.setHeader("Content-Type", "application/zip");
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadCdr = async (req, res) => {
    try {
      const { ruc, correlativo } = req.params;
      const data = await this.odooService.downloadZipB(ruc, correlativo);
      res.setHeader("Content-Type", "application/zip");
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadPdfA4 = async (req, res) => {
    try {
      const { ruc, correlativo } = req.params;
      const data = await this.odooService.downloadPdfA(ruc, correlativo);
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  downloadPdfTicket = async (req, res) => {
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
