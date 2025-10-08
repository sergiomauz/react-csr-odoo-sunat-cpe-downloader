import axios from "axios";


export class OdooService {
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
