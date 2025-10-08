import fs from "fs";
import yaml from "js-yaml";
import path from "path";


export function loadConfig() {
  const configFilePath = path.join(process.cwd(), "config.yaml");
  try {
    const file = fs.readFileSync(configFilePath, "utf8");
    const config = yaml.load(file);

    if (!config || !config.server.port || !config.companies) {
      throw new Error("Archivo YAML inválido.");
    }
    console.log("✅ Configuración cargada correctamente desde YAML");

    return config;

  } catch (err) {
    console.error("❌ Error al cargar la configuración YAML:", err.message);
    process.exit(1);
  }
}
