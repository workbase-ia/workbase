import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SKILL_KEYWORDS_PATH = path.join(__dirname, '..', 'data', 'skillKeywords.json');


// Leitura Síncrona do JSON
let SKILL_KEYWORDS_DATA = {};
try {
    const data = fs.readFileSync(SKILL_KEYWORDS_PATH, 'utf8');
    SKILL_KEYWORDS_DATA = JSON.parse(data);
} catch (error) {
    console.error("ERRO: Falha ao carregar o dicionário de habilidades.", error.message);
}

// Acha a lista completa de palavras-chave para iteração
const ALL_KEYWORDS = [].concat(...Object.values(SKILL_KEYWORDS_DATA));

/**
 * Analisa as descrições de um array de vagas e agrega a contagem de habilidades.
 */
export function analisarHabilidadesVagas(vagas) {
    if (!vagas || vagas.length === 0) {
        return [];
    }

    const skillCounts = new Map();
    const normalizeText = (text) => 
        text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

    vagas.forEach(vaga => {
        const textoComMargem = ` ${normalizeText(vaga.titulo || '')} ${normalizeText(vaga.descricao || '')} `;

        ALL_KEYWORDS.forEach(keyword => {
            const searchPattern = ` ${normalizeText(keyword)} `;
            
            if (textoComMargem.includes(searchPattern)) {
                const currentCount = skillCounts.get(keyword) || 0;
                skillCounts.set(keyword, currentCount + 1);
            }
        });
    });

    const aggregatedSkills = Array.from(skillCounts.entries())
        .map(([skill, count]) => ({
            nome: skill,
            contagem: count
        }))
        .sort((a, b) => b.contagem - a.contagem);

    return aggregatedSkills;
}