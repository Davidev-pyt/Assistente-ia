#importações necessárias para a aplicação
import os
from fastapi import FastAPI
from dotenv import load_dotenv
from groq import Groq

#Carregando as variáveis de ambiente do arquivo .env
load_dotenv()

#Obtendo a chave da API do Groq a partir das variáveis de ambiente
chave_api_groq = os.getenv("GROQ_API_KEY")
#Criando a instância do cliente Groq
client = Groq(api_key=chave_api_groq)
#Criando a aplicação FastAPI
app = FastAPI()

#Criando a primeira rota da aplicação
@app.get("/")
def pagina_inicial():
    return{
        "status": "Servidor Online",
        "Mensagem": "Bem-vindo ao Backend do Assistente de IA do Davi!",
        "Segurança": "Cofre configurado com sucesso!" if chave_api_groq else "Cofre não configurado"
    }

#Criando a rota para gerar respostas usando o modelo GPT-4
@app.post("/resumir")
def resumir_texto(dados: dict):
    texto_usuario = dados.get("texto")
    if not texto_usuario:
        return {"erro": "Nenhum texto fornecido para resumir."}

    # O bloco try protege o servidor contra quedas por erros externos de conexão ou chaves inválidas
    try:
        resposta = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Você é um assistente de estudos inteligente para estudantes universitários. "
                        "Sua função é resumir textos de forma clara e concisa, mantendo os pontos principais e a essência do conteúdo. "
                        "Retorne o resultado exatamente nesta estrutura de títulos Markdown:\n"
                        "## 📝 1. Resumo em Tópicos Dinâmicos\n"
                        "(coloque os tópicos aqui)\n\n"
                        "## 📅 2. Cronograma de Estudo Sugerido\n"
                        "(coloque o cronograma aqui)\n\n"
                        "## 🗂️ 3. Flashcards de Memorização\n"
                        "(coloque 3 perguntas e respostas aqui)"
                    ),
                },
                {
                    "role": "user",
                    "content": f"Aqui está o meu texto: {texto_usuario}"
                },
            ],
        )

        resposta_ia = resposta.choices[0].message.content
        return {
            "mensagem": "Texto processado pela IA Real (Groq) com sucesso!",
            "resultado_ia": resposta_ia,
        }

    except Exception as e:
        return {
            "erro": "Falha na comunicação com a API da Groq.",
            "diagnostico_do_erro": str(e),
            "verifique_isso": "Garanta que sua chave no .env começa com 'gsk_' e não contém aspas ou espaços."
        }
