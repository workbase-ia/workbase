//  1. LIMITES DO AMBIENTE 
const limites = {
  "temperatura": { 
    "ideal": 22,  
    "min": 18,    
    "max": 25     
  },
  "luminosidade": { 
    "ideal": 800, 
    "min": 300,   
    "max": 1500  
  },
  "umidade": { 
    "ideal": 70,  
    "min": 40,    
    "max": 85     
  }
};

// LÓGICA DE ANÁLISE 

/**
 * Calcula a pontuação de foco baseada nos dados ambientais
 */
function calcularPontuacaoFoco(dados) {
  let pontuacao = 100;

  const tempIdeal = limites.temperatura.ideal;
  const diffTemp = Math.abs(dados.temperatura - tempIdeal);
  const penalidade_temp = Math.min(25, (diffTemp / 2) * 25);
  pontuacao -= penalidade_temp;

  const umidadeIdeal = limites.umidade.ideal;
  const diffUmidade = Math.abs(dados.umidade - umidadeIdeal);
  const penalidade_umidade = Math.min(35, (diffUmidade / 15) * 35);
  pontuacao -= penalidade_umidade;

  const luzIdeal = limites.luminosidade.ideal;
  const diffLuz = Math.abs(dados.luminosidade - luzIdeal);
  const penalidade_luz = Math.min(30, (diffLuz / 200) * 30);
  pontuacao -= penalidade_luz;

  if (!dados.presenca) {
    pontuacao -= 10;
  }

  return Math.max(0, Math.round(pontuacao));
}

/**
 * Calcula o nível de conforto (0-100)
 */
function calcularConforto(dados) {
  let conforto = 100;

  if (
    dados.temperatura < limites.temperatura.min ||
    dados.temperatura > limites.temperatura.max
  ) {
    conforto -= 20;
  }
  if (
    dados.umidade < limites.umidade.min ||
    dados.umidade > limites.umidade.max
  ) {
    conforto -= 25;
  }
  if (
    dados.luminosidade < limites.luminosidade.min ||
    dados.luminosidade > limites.luminosidade.max
  ) {
    conforto -= 25;
  }
  return Math.max(0, Math.round(conforto));
}

function gerarRecomendacoes(dados) {
  const recomendacoes = [];

  // Verificar temperatura
  if (dados.temperatura > limites.temperatura.max) {
    recomendacoes.push({
      titulo: "Temperatura Elevada",
      descricao: "A temperatura está acima do ideal. Isso pode afetar sua concentração e conforto.",
      prioridade: dados.temperatura > 25 ? "alta" : "media",
      tipo: "temperatura",
    });
  } else if (dados.temperatura < limites.temperatura.min) {
    recomendacoes.push({
      titulo: "Temperatura Baixa",
      descricao: "O ambiente está muito frio. Considere ajustar o aquecimento ou usar roupas mais quentes.",
      prioridade: dados.temperatura < 18 ? "alta" : "media",
      tipo: "temperatura",
    });
  }

  // Verificar umidade
  if (dados.umidade > limites.umidade.max) {
    recomendacoes.push({
      titulo: "Umidade Elevada",
      descricao: "O ar está muito úmido. Isso pode causar desconforto e sonolência. Considere usar um desumidificador.",
      prioridade: "media",
      tipo: "umidade",
    });
  } else if (dados.umidade < limites.umidade.min) {
    recomendacoes.push({
      titulo: "Ar Seco",
      descricao: "O ar está muito seco. Isso pode causar irritação nos olhos e garganta. Considere usar um umidificador.",
      prioridade: "media",
      tipo: "umidade",
    });
  }

  // Verificar luminosidade
  if (dados.luminosidade < limites.luminosidade.min) {
    recomendacoes.push({
      titulo: "Iluminação Insuficiente",
      descricao: "A iluminação está baixa. Aumente a luminosidade para melhorar sua criatividade e reduzir fadiga ocular.",
      prioridade: "media",
      tipo: "luminosidade",
    });
  } else if (dados.luminosidade > limites.luminosidade.max) {
    recomendacoes.push({
      titulo: "Iluminação Excessiva",
      descricao: "A iluminação está muito forte. Isso pode causar fadiga ocular. Ajuste as luzes ou use cortinas.",
      prioridade: "media",
      tipo: "luminosidade",
    });
  }
  
  // Recomendação positiva
  if (recomendacoes.length === 0) {
    recomendacoes.push({
      titulo: "Ambiente Ideal",
      descricao: "Seu ambiente está em condições perfeitas! Aproveite este momento para focar em suas tarefas importantes.",
      prioridade: "baixa",
      tipo: "geral",
    });
  }
  return recomendacoes;
}


function determinarStatus(pontuacaoFoco) {
  if (pontuacaoFoco >= 75) return "ideal";
  if (pontuacaoFoco >= 50) return "aceitavel";
  return "critico";
}

/**
 * Função principal de análise (interna)
 */
function analisarAmbiente(dados) {
  const pontuacaoFoco = calcularPontuacaoFoco(dados);
  const conforto = calcularConforto(dados);
  const recomendacoes = gerarRecomendacoes(dados);
  const status = determinarStatus(pontuacaoFoco);

  return {
    pontuacaoFoco,
    conforto,
    recomendacoes,
    dadosAtuais: dados,
    status,
  };
}


export const analisar = (req, res) => {
  try {
    console.log("DADOS RECEBIDOS DO WOKWI:");
    console.log(req.body);
    
    const { temperatura, umidade, luminosidade, presenca } = req.body;

    if (temperatura == null || umidade == null || luminosidade == null || presenca == null) {
      return res.status(400).json({ 
        message: 'Dados de entrada ausentes ou inválidos. Verifique o JSON enviado.' 
      });
    }

    const dadosParaAnalisar = {
      temperatura: Number(temperatura),
      umidade: Number(umidade),
      luminosidade: Number(luminosidade),
      presenca: Boolean(presenca),
      timestamp: new Date().toISOString(),
    };

    const resultado = analisarAmbiente(dadosParaAnalisar);

    res.status(200).json(resultado);

  } catch (error) {
    res.status(500).json({ 
      message: 'Erro interno ao analisar o ambiente', 
      error: error.message 
    });
  }
};