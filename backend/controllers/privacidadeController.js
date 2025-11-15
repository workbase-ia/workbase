import { verificarConsentimento, excluirDadosUsuario } from '../lib/utilidadesLGPD.js';

let consentimentoAtivo = true;

// Funções já estão em ES Modules (export const)
export const getConsentimentoStatus = (req, res) => {
    res.json({ 
        status: consentimentoAtivo ? 'ativo' : 'inativo',
        mensagem: consentimentoAtivo ? 'O consentimento para coleta de dados está ativo.' : 'O consentimento para coleta de dados está inativo.'
    });
};

export const ativarConsentimento = (req, res) => {
    consentimentoAtivo = true;
    res.status(200).json({ 
        status: 'ativo', 
        mensagem: 'Consentimento ativado. Agradecemos por confiar no WorkBalance AI!' 
    });
};

export const revogarConsentimento = (req, res) => {
    consentimentoAtivo = false;
    res.status(200).json({ 
        status: 'inativo', 
        mensagem: 'Consentimento revogado. A coleta de novos dados foi interrompida.' 
    });
};


export const solicitarExclusao = (req, res) => {
    const sucesso = excluirDadosUsuario(); 
    if (sucesso) {
        consentimentoAtivo = false; 
        res.status(200).json({ 
            sucesso: true, 
            mensagem: 'Todos os dados de histórico foram excluídos com sucesso, conforme seu direito LGPD.' 
        });
    } else {
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro ao tentar excluir os dados.' 
        });
    }
};

