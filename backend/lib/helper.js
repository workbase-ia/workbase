import fs from "fs";
import path from "path";

const baseDir = path.resolve("data"); 

function resolvePath(fileOrPath) {
  if (path.isAbsolute(fileOrPath)) return fileOrPath;

  if (fileOrPath.startsWith("data" + path.sep)) {
    fileOrPath = fileOrPath.slice(5); 
  }

  return path.join(baseDir, fileOrPath);
}

export function readJSON(fileOrPath) {
  try {
    const fullPath = resolvePath(fileOrPath);
    console.log("[readJSON] Lendo:", fullPath);
    const content = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("[readJSON] Erro ao ler:", fileOrPath);
    console.error(err && err.message ? err.message : err);
    return null;
  }
}

export function writeJSON(fileOrPath, data) {
  try {
    const fullPath = resolvePath(fileOrPath);
    console.log("[writeJSON] Gravando:", fullPath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[writeJSON] Erro ao gravar:", fileOrPath);
    console.error(err && err.message ? err.message : err);
    return false;
  }
}
