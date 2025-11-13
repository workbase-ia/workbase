import fs from 'fs';

/**
 * 
 * @param {string} filePath 
 * @returns {object | null} 
 */
export const readJSON = (filePath) => {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Erro ao ler o arquivo JSON: ${filePath}`, error.message);
    return null; 
  }
};

/**
 * 
 * @param {string} filePath 
 * @param {object} data 
 */
export const writeJSON = (filePath, data) => {
  try {
   
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
  } catch (error) {
    console.error(`Erro ao escrever no arquivo JSON: ${filePath}`, error.message);
  }
};