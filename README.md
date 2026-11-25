# 🎓 EducaIA

Protótipo de tutor educacional inteligente desenvolvido em Node.js e integrado à API do Google Gemini (`gemini-3.8-flash`). A aplicação gera explicações personalizadas, cria exercícios de múltipla escolha e avalia respostas de estudantes de acordo com o nível de conhecimento selecionado.

---

## ✨ Funcionalidades

* **Explicação Personalizada:** Gera explicações adaptadas ao nível do estudante (`iniciante`, `intermediário` ou `avançado`), incluindo exemplo prático, resumo em tópicos e uma pergunta final de reflexão.
* **Geração de Exercícios (Quiz):** Cria questões inéditas de múltipla escolha (alternativas A a D) sobre o tema informado.
* **Avaliação de Respostas:** Analisa a resposta enviada pelo estudante com base na questão gerada, apontando acertos, explicando o raciocínio e oferecendo dicas de estudo.
* **Verificação de Status da API:** Indica na interface se a chave da API está configurada e qual modelo está ativo.

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express, Dotenv
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **IA:** Google Gemini API (`gemini-3.8-flash` / `Groq`/)



## 📁 Estrutura do Projeto

```text
educaia-prototipo/
├── public/
│   ├── index.html          # Interface principal
│   ├── styles.css          # Estilização da aplicação
│   └── app.js              # Lógica do frontend e consumo das rotas
├── .env.example            # Modelo de variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── INICIAR-EDUCAIA.bat     # Atalho de inicialização rápida no Windows
├── package.json            # Dependências e scripts do projeto
└── server.js               # Servidor Express e integração com a Gemini API
