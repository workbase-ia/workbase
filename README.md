# 🌐 Workbase AI

## 💡 Visão Geral do Projeto

**Workbase AI** é uma plataforma de conexão profissional moderna, inspirada em redes sociais corporativas como o LinkedIn. O projeto visa criar um ecossistema digital onde trabalhadores podem se conectar com base em interesses, áreas de atuação e experiências similares, facilitando o **networking estratégico**, o **compartilhamento de conhecimento** e a **busca por oportunidades de emprego** através de palavras-chave.

O diferencial do projeto reside na menção à "AI" (Inteligência Artificial), que sugere a futura implementação de algoritmos para otimizar a correspondência entre profissionais e vagas, ou para personalizar o feed de conteúdo.

## ✨ Funcionalidades Principais

A plataforma oferece um conjunto robusto de recursos para engajamento e desenvolvimento profissional:

*   **Autenticação e Cadastro:** Sistema seguro de registro e login para novos usuários.
*   **Perfis Profissionais:** Criação e personalização de perfis detalhados, incluindo resumo, habilidades, experiência e formação.
*   **Feed de Atividades:** Um feed dinâmico que exibe posts, permitindo interações como comentários e curtidas.
*   **Conexão Inteligente:** Funcionalidade para conectar usuários com base em áreas de interesse e experiência em comum.
*   **Busca de Vagas:** Módulo de busca que permite aos usuários encontrar oportunidades de emprego utilizando palavras-chave relevantes.
*   **Sistema de Dark Mode:** Opção de tema escuro para melhor conforto visual e experiência do usuário.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com uma arquitetura moderna, separando claramente o Frontend (interface do usuário) e o Backend (serviços e lógica de negócios).

| Categoria | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Frontend** | **React** | Biblioteca JavaScript para construção de interfaces de usuário reativas e baseadas em componentes. |
| | **Vite** | Ferramenta de build e servidor de desenvolvimento ultrarrápido, otimizando o tempo de desenvolvimento. |
| | **Tailwind CSS** | Framework CSS *utility-first* que permite a criação rápida de designs customizados e responsivos. |
| **Backend** | **Node.js** | Ambiente de execução JavaScript que permite a construção de APIs escaláveis e de alto desempenho. |
| | **JavaScript** | Linguagem de programação unificada, utilizada tanto no frontend quanto no backend. |
| **Banco de Dados** | *JSON* | Dados armazenados em bibliotecas JSON |

## 📦 Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto Workbase AI em seu ambiente local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   [**Node.js**](https://nodejs.org/): Versão 16.x ou superior.
*   [**npm**](https://www.npmjs.com/) (gerenciador de pacotes do Node.js).
*   **Git**.

### 1. Clonar o Repositório

Abra seu terminal e execute o comando para clonar o projeto:

```bash
git clone https://github.com/workbase-ia/workbase
cd workbase
```

### 2. Instalar Dependências

Assumindo uma estrutura de projeto com diretórios separados para o frontend e backend, instale as dependências em cada um:

**A. Dependências do Backend (API)**

```bash
# Navegue até o diretório do backend 
cd backend
npm install
```

**B. Dependências do Frontend (Interface)**

```bash
# Volte para o diretório raiz e navegue para o frontend
cd ..
cd frontend
npm install
```

***Nota:** Se o projeto utilizar um único `package.json` na raiz (monorepo simples), basta executar `npm install` no diretório raiz (`workbase`).*

### 3. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend` e configure as variáveis necessárias.

**Exemplo de `.env` no diretório `backend`:**

```
JWT_SECRET="sua_chave_secreta_para_autenticacao"
```

### 4. Execução do Projeto

Execute o backend e o frontend em terminais separados.

**A. Iniciar o Backend**

No diretório `backend`:

```bash
npm start
# Ou, se usar nodemon para desenvolvimento:
# npm run dev
```

O servidor da API estará rodando em `http://localhost:3001` (ou na porta configurada).

**B. Iniciar o Frontend**

No diretório `frontend`:

```bash
npm run dev
```

O aplicativo React estará acessível em `http://localhost:5173` (ou na porta padrão do Vite).

## 🔐 Credenciais de Teste

Para explorar a plataforma imediatamente, você pode utilizar as seguintes credenciais de teste:

| Campo | Valor |
| :--- | :--- |
| **Email** | `yuri@teste.com` |
| **Senha** | `perdepenalti` |

## 👥 Autores

O projeto Workbase AI foi desenvolvido por:

*   **Leonardo Grosskopf** - RM562255
*   **Thayná Lopes** - RM566349

## 🔗 Repositório

O código-fonte completo do projeto está disponível em:

[https://github.com/workbase-ia/workbase](https://github.com/workbase-ia/workbase)
