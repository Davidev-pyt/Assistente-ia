#importações necessárias para a aplicação
import os
from fastapi import FastAPI
from dotenv import load_dotenv

#Carregando as variáveis de ambiente do arquivo .env
load_dotenv()

#Obtendo a chave da API do OpenAI a partir das variáveis de ambiente
chave_api_openai = os.getenv("OPENAI_API_KEY")
#Criando a aplicação FastAPI
app = FastAPI()

#Criando a primeira rota da aplicação
@app.get("/")
def pagina_inicial():
    return{
        "status": "Servidor Online",
        "Mensagem": "Bem-vindo ao Backend do Assistente de IA do Davi!",
        "Segurança": "Cofre configurado com sucesso!" if chave_api_openai else "Cofre não configurado"
    }
#Criando uma segunda rota do tipo POST
@app.post("/resumir")
def resumir_texto(dados: dict):
    #Captura o texto enviado pelo usuário no Frontend
    texto = dados.get("texto")

    #Por enquanto, apenas retornando o texto enviado pelo usuário
    return {
        "mensagem": "Texto recebido com sucesso!",
        "tamanho_texto": len(texto) if texto else 0,
        "preview": texto[:50]+"..." if texto else "Texto vazio"
    }