const fs = require('fs');
const path = require('path');

const SOFTSKILLS_PATH = path.join(__dirname, '..', 'data', 'softSkills.json');

const lerSoftSkills = () => {
    try {
        const data = fs.readFileSync(SOFTSKILLS_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler softSkills.json:', error.message);
        return { glossario: [], associacoes: {} };
    }
};

const getGlossario = (req, res) => {
    const { glossario } = lerSoftSkills();
    if (glossario && glossario.length > 0) {
        res.json(glossario);
    } else {
        res.status(404).json({ mensagem: 'Glossário de Soft Skills não encontrado.' });
    }
};

const getSoftSkillDoDia = (req, res) => {
    const { glossario } = lerSoftSkills();
    
    if (!glossario || glossario.length === 0) {
        return res.status(404).json({ mensagem: 'Não foi possível determinar a Soft Skill do Dia.' });
    }

    const randomIndex = Math.floor(Math.random() * glossario.length);
    const softSkillDoDia = glossario[randomIndex];

    const dica = `Dica do dia: Pratique a **${softSkillDoDia.nome}** hoje. Tente dedicar 15 minutos ininterruptos a uma tarefa que exija foco total.`;

    res.json({
        ...softSkillDoDia,
        dicaContextualizada: dica
    });
};

module.exports = {
    getGlossario,
    getSoftSkillDoDia,
};
