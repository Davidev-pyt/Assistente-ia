// 1. CONSTANTES
const gerar_resumo = document.getElementById('gerar-resumo');
const texto_materia = document.getElementById('texto-materia');
const resumo_container = document.getElementById('resumo-container');
const resultado_ia = document.getElementById('resultado-ia');

// 2. O EVENTO DE CLIQUE
gerar_resumo.addEventListener('click', async function(event) {
    event.preventDefault();
    
    const texto = texto_materia.value;
    
    if (!texto) {
        alert('Por favor, insira um texto antes para gerar o resumo.');
        return;
    }

    // 3. Alterar o conteúdo do botão para mostrar o spinner
    gerar_resumo.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2">Gerando resumo...</span>
    `;

    // Altera o visual do botão separando as classes por vírgula
    gerar_resumo.classList.add('animate-pulse', 'bg-indigo-800');

   //Faz a requisição para a API
       try {
        // 1. Chamada para o servidor python
        const resposta = await fetch('http://localhost:8000/resumir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Avisa ao Python que estamos enviando um dicionário/JSON
            },
            body: JSON.stringify({ "texto": texto }) // Transforma o objeto JS em texto puro para a viagem
        });

        const dadosDoServidor = await resposta.json();

        // 3. Joga o resultado da IA dentro da div alvo do HTML
        resultado_ia.textContent = dadosDoServidor.resultado_ia;

        resumo_container.classList.remove('hidden');

    } catch (erro) {
        // Se o Python estiver desligado ou der erro, avisa o usuário
        alert("Erro ao conectar com o servidor Back-End. Certifique-se de que o Python está rodando!");
        console.error(erro);
    }

});
