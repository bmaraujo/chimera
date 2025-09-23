import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

/**
 * Carrega dinamicamente um arquivo 
 * @param {string} filePath - Nome do arquivo
 * @returns {object} Configuração carregada
 */
function fileLoader(filePath) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const configPath = path.resolve(__dirname, `${filePath}`);

  if (!fs.existsSync(configPath)) {
    throw new Error(`Arquivo '${filePath}' não encontrado.`);
  }

  const raw = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(raw);
}

export { loafileLoaderConfig };
