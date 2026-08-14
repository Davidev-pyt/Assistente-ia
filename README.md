# 🧠 Assistente de Estudos Inteligente - Full Stack com IA

Este é um aplicativo Full Stack moderno desenvolvido para ajudar estudantes universitários a otimizarem suas rotas de aprendizado. O sistema recebe textos acadêmicos ou notas de aula e utiliza Inteligência Artificial generativa para criar automaticamente resumos estruturados, cronogramas de estudo e simulados (quizzes) dinâmicos.

---

## 🚀 Funcionalidades Ativas

- **📝 Geração de Resumos Dinâmicos:** Sintetiza textos longos extraindo conceitos-chave em tópicos organizados.
- **📅 Cronograma Sob Demanda:** Cria um plano de estudos passo a passo ocultável, mantendo a interface limpa (UX).
- **🗂️ Flashcards de Memorização:** Gera cartões de perguntas e respostas para fixação de conteúdo.
- **🎯 Simulados Automatizados (Quiz):** Uma rota exclusiva que cria 4 questões de múltipla escolha com alternativas e gabarito justificado.
- **🔍 Sugestões Interativas (Lupinhas):** Botões dinâmicos que injetam perguntas de aprofundamento de volta no campo de texto com um único clique.
- **🛡️ Tratamento de Exceções & CORS:** Servidor blindado com blocos `try/except` e políticas de CORS configuradas para segurança total de rede.

---

## 🛠️ Tecnologias Utilizadas

### Front-End
- **HTML5:** Estrutura semântica da aplicação.
- **Tailwind CSS (via CDN):** Estilização ágil com design moderno focado em Dark Mode.
- **JavaScript (ES6+):** Manipulação dinâmica do DOM, tratamento de eventos e comunicação assíncrona (`async/await` + `Fetch API`).

### Back-End
- **Python 3:** Linguagem base para toda a inteligência estrutural.
- **FastAPI:** Framework moderno e de alta performance para a construção das rotas da API.
- **Uvicorn:** Servidor ASGI rápido para rodar a aplicação local.
- **Groq SDK & Llama 3.1 (Meta):** Integração com modelos de linguagem de grande escala (LLM) de forma gratuita e em tempo real.
- **Dotenv:** Gerenciamento seguro de variáveis de ambiente para proteção de chaves de API.

---

## 📦 Como Rodar o Projeto Localmente

### Pré-requisitos
- Python instalado na máquina.
- Extensão **Live Server** instalada no VS Code.
- Uma chave de API gratuita gerada no painel da **Groq Console**.

### 1. Configurando o Back-End (Python)
Abra o terminal na pasta raiz do projeto e execute os seguintes comandos:

# Criar o ambiente virtual
python -m venv .venv

# Ativar o ambiente virtual (Windows)
.venv\Scripts\activate

# Instalar as dependências necessárias
pip install fastapi uvicorn groq python-dotenv

### 2. Configurando o Cofre de Segurança (.env)
Crie um arquivo chamado `.env` na raiz do projeto e insira a sua chave da Groq (sem aspas):
GROQ_API_KEY=gsk_SuaChaveRealDaGroqAqui

### 3. Inicializando o Servidor
Com o ambiente virtual ativo, inicie o Uvicorn:
uvicorn main:app --reload

O servidor estará rodando em: `http://localhost:8000`

### 4. Inicializando o Front-End
Abra o arquivo `frontend/index.html` no VS Code, clique com o botão direito e selecione **"Open with Live Server"**. O site abrirá na porta `:5500` pronto para uso!

---

## 🔒 Boas Práticas de Engenharia Aplicadas
- **Variáveis de Ambiente:** Proteção absoluta de credenciais sensíveis através do arquivo `.gitignore`.
- **Tratamento de Erros:** Captura automatizada de falhas de conexão de rede, evitando o travamento do sistema.
- **Responsividade:** Interface adaptada para computadores e dispositivos móveis usando as grades dinâmicas do Tailwind.

---
Componente do portfólio de engenharia de software desenvolvido por Davi.
