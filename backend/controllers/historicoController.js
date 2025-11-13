const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const HISTORICO_PATH = path.join(__dirname, '..', 'data', 'historicoUsuario.json');

const lerHistorico = () => {
   try {
      const data = fs.readFileSync(HISTORICO_PATH, 'utf8');
      return JSON.parse(data);
   } catch (error) {
      console.error('Erro ao ler histórico:', error.message);
      return [];
   }
};

const escreverHistorico = (novoHistorico) => {
   try {
      fs.writeFileSync(HISTORICO_PATH, JSON.stringify(novoHistorico, null, 2), 'utf8');
   } catch (error) {
      console.error('Erro ao escrever histórico:', error.message);
   }
};

const getHistorico = (req, res) => {
   const historico = lerHistorico();
   res.json(historico);
};

// Controller para gerar o relatório em PDF
const gerarRelatorioPDF = (req, res) => {
   const historico = lerHistorico();

   if (historico.length === 0) {
      return res.status(404).send('Nenhum dado de histórico encontrado para gerar o relatório.');
   }


   res.setHeader('Content-Type', 'application/pdf');
   res.setHeader('Content-Disposition', 'attachment; filename="Relatorio_WorkBalanceAI.pdf"');

   const doc = new PDFDocument({ size: 'A4', margin: 50 });


   doc.pipe(res);


   doc.fontSize(24)
      .fillColor('#004d40') 
      .text('Relatório de Produtividade e Bem-Estar', { align: 'center' })
      .moveDown(0.5);

   doc.fontSize(14)
      .fillColor('#333333')
      .text('WorkBalance AI - Seu Guia para o Equilíbrio', { align: 'center' })
      .moveDown(1.5);


   doc.fontSize(12)
      .text('Olá! Este relatório resume suas interações e o impacto do ambiente no seu foco e bem-estar. Lembre-se: o autoconhecimento é o primeiro passo para uma rotina mais saudável e produtiva.', { align: 'justify' })
      .moveDown(1);


   doc.fontSize(16)
      .fillColor('#004d40')
      .text('Resumo do Período', { underline: true })
      .moveDown(0.5);

   doc.fontSize(12)
      .fillColor('#333333')
      .text(`Período analisado: ${historico[0].timestamp.substring(0, 10)} a ${historico[historico.length - 1].timestamp.substring(0, 10)}`)
      .moveDown(0.5);


   const totalRecomendacoes = historico.filter(item => item.recomendacao).length;
   const mediaFoco = (historico.reduce((acc, item) => acc + item.pontuacaoFoco, 0) / historico.length).toFixed(1);

   doc.text(`Média de Foco no Período: ${mediaFoco} / 100`)
      .text(`Total de Recomendações Recebidas: ${totalRecomendacoes}`)
      .moveDown(1.5);


   doc.fontSize(16)
      .fillColor('#004d40')
      .text('Histórico Detalhado de Leituras e Insights', { underline: true })
      .moveDown(0.5);

   const tableTop = doc.y;
   const itemHeight = 20;
   const col1 = 50;
   const col2 = 150;
   const col3 = 250;
   const col4 = 400;


   doc.fillColor('#004d40')
      .text('Data/Hora', col1, tableTop)
      .text('Foco', col2, tableTop)
      .text('Recomendação', col3, tableTop)
      .text('Soft Skill', col4, tableTop)
      .moveDown(0.5);

   let currentY = doc.y;


   historico.slice(-10).forEach((item, index) => { 
      if (currentY + itemHeight > 750) {  
         doc.addPage();
         currentY = 50; 
         doc.fillColor('#004d40')
            .text('Data/Hora', col1, currentY)
            .text('Foco', col2, currentY)
            .text('Recomendação', col3, currentY)
            .text('Soft Skill', col4, currentY)
            .moveDown(0.5);
         currentY = doc.y;
      }

      const dataHora = new Date(item.timestamp).toLocaleTimeString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      const foco = `${item.pontuacaoFoco}/100`;
      const recomendacao = item.recomendacao ? item.recomendacao.substring(0, 40) + '...' : 'Ambiente Ideal';
      const softSkill = item.softSkillAssociada || '-';

      doc.fillColor('#666666')
         .text(dataHora, col1, currentY)
         .text(foco, col2, currentY)
         .text(recomendacao, col3, currentY, { width: 140 })
         .text(softSkill, col4, currentY)
         .moveDown(0.5);

      currentY = doc.y;
   });

   doc.addPage();
   doc.fontSize(16)
      .fillColor('#004d40')
      .text('Entendendo as Recomendações', { underline: true })
      .moveDown(0.5);

   doc.fontSize(12)
      .fillColor('#333333')
      .text('Cada recomendação é gerada com base em desvios dos limites ideais de temperatura, ruído e luminosidade. Nosso objetivo é sempre fornecer um insight claro sobre como o ambiente pode estar afetando sua concentração.', { align: 'justify' })
      .moveDown(1);

   doc.fontSize(14)
      .fillColor('#004d40')
      .text('Exemplo de Insight:', { bold: true })
      .moveDown(0.5);

   doc.fontSize(12)
      .fillColor('#333333')
      .text('Se a temperatura estiver muito alta, a IA sugere: "A temperatura elevada pode causar fadiga. Tente ventilar o ambiente e pratique a **Autogestão** do seu conforto."')
      .moveDown(1);

   doc.fontSize(10)
      .fillColor('#999999')
      .text('Relatório gerado pelo WorkBalance AI. Todos os dados são anonimizados e usados apenas para o seu autoconhecimento, conforme a LGPD.', 50, 780, { align: 'center' });

   doc.end();
};

module.exports = {
   getHistorico,
   gerarRelatorioPDF,
};
