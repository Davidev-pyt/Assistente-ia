// 1. CONSTANTES NO TOPO
const gerar_resumo = document.getElementById('gerar-resumo');
const texto_materia = document.getElementById('texto-materia');
const resumo_container = document.getElementById('resumo-container');
const resultado_ia = document.getElementById('resultado-ia');
const gerar_quiz = document.getElementById('gerar-quiz');
const container_sugestoes = document.getElementById('container-sugestoes');
const lista_sugestoes = document.getElementById('lista-sugestoes');
const btn_ver_cronograma = document.getElementById('btn-ver-cronograma');
const conteudo_cronograma = document.getElementById('conteudo-cronograma');
const seta_cronograma = document.getElementById('seta-cronograma');

// 2. EVENTO DE CLIQUE: GERAR RESUMO
gerar_resumo.addEventListener('click', async function(event) {
    event.preventDefault();
    const texto = texto_materia.value;
    
    if (!texto) {
        alert('Por favor, insira um texto antes para gerar o resumo.');
        return;
    }

    gerar_resumo.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2">Gerando resumo...</span>
    `;
    gerar_resumo.classList.add('animate-pulse', 'bg-indigo-800');

    try {
        const resposta = await fetch('http://localhost:8000/resumir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "texto": texto })
        });

        const dadosDoServidor = await resposta.json();

        // Tratamento simples do texto para separar o Cronograma se ele vier junto
        let textoPrincipal = dadosDoServidor.resultado_ia || "";
        let textoCronograma = "Nenhum cronograma detalhado gerado para este bloco.";

        if (textoPrincipal.includes("📅 2. Cronograma")) {
            const partes = textoPrincipal.split("📅 2. Cronograma");
            textoPrincipal = partes[0];
            textoCronograma = "📅 2. Cronograma" + partes[1];
        }

        resultado_ia.textContent = textoPrincipal;
        conteudo_cronograma.textContent = textoCronograma;

        resumo_container.classList.remove('hidden');
        criarSugestoesInterativas();

    } catch (erro) {
        alert("Erro ao conectar com o servidor Back-End. Certifique-se de que o Python está rodando!");
        console.error(erro);
    } finally {
        gerar_resumo.innerHTML = 'Gerar Resumo';
        gerar_resumo.classList.remove('animate-pulse', 'bg-indigo-800');
    }
});

// 3. EVENTO DE CLIQUE: GERAR QUIZ
gerar_quiz.addEventListener('click', async function (event) {
    event.preventDefault();
    const texto = texto_materia.value;
    if (!texto) {
        alert('Por favor, insira um texto valido para gerar o Quiz');
        return;
    }
    
    gerar_quiz.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-2">Gerando Quiz...</span>
    `;
    gerar_quiz.classList.add('animate-pulse', 'bg-emerald-800');

    try {
        const resposta = await fetch('http://localhost:8000/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "texto": texto })
        });

        const dadosDoServidor = await resposta.json();
        resultado_ia.textContent = dadosDoServidor.resultado_quiz;
        
        conteudo_cronograma.classList.add('hidden');
        seta_cronograma.textContent = '🔽';
        
        resumo_container.classList.remove('hidden');
        criarSugestoesInterativas();

    } catch (erro) {
        alert("Erro ao conectar com o servidor Back-End. Certifique-se de que o Python está rodando!");
        console.error(erro);
    } finally {
        gerar_quiz.innerHTML = 'Gerar Quiz';
        gerar_quiz.classList.remove('animate-pulse', 'bg-emerald-800');
    }
});

// 4. INTERATIVIDADE: EXPANDIR/RECOLHER CRONOGRAMA
btn_ver_cronograma.addEventListener('click', function() {
    conteudo_cronograma.classList.toggle('hidden');
    if (conteudo_cronograma.classList.contains('hidden')) {
        seta_cronograma.textContent = '🔽';
    } else {
        seta_cronograma.textContent = '🔼';
    }
});

// 5. INTERATIVIDADE: GERAR AS LUPINHAS CLICÁVEIS (SUGESTÕES)
function criarSugestoesInterativas() {
    lista_sugestoes.innerHTML = "";

    const sugestoes = [
        "Quais são os principais conceitos e aplicações práticas do texto enviado?",
        "Explique detalhadamente como funciona a arquitetura e os pilares desse tema."
    ];

    sugestoes.forEach(function(pergunta) {
        const botaoSugestao = document.createElement('button');
        botaoSugestao.className = "w-full text-left bg-slate-900 hover:bg-slate-800 text-slate-300 p-3 rounded-xl border border-slate-800 transition-colors flex items-center justify-between gap-3 text-sm group";
        
        botaoSugestao.innerHTML = `
            <span>${pergunta}</span>
            <span class="text-indigo-400 group-hover:scale-110 transition-transform">🔍</span>
        `;

        botaoSugestao.addEventListener('click', function() {
            texto_materia.value = pergunta;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        lista_sugestoes.appendChild(botaoSugestao);
    });

    container_sugestoes.classList.remove('hidden');
}
