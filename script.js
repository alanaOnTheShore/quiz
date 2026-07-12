// ---CAPTURA DE ELEMENTOS---
const secaoInicial = document.getElementById('inicial');
const secaoJogo = document.getElementById('jogo');
const secaoPlacar = document.getElementById('placar');

const inputNome = document.getElementById('input-nome');
const btnComecar = document.getElementById('btn-comecar');
const btnReiniciar = document.getElementById('btn-reiniciar');

const textoPergunta = document.getElementById('texto-pergunta');
const alternativas = document.getElementById('alternativas');
const corpoRanking = document.getElementById('corpo-ranking');

//-------------------------------------------------------------
//--- SIMULAÇÃO DE PERGUNTAS DO BANCO DE DADOS ---
const perguntas = [
    {
        enunciado: "Qual linguagem é conhecida como a 'mãe' da web para estruturar páginas?",
        alternativas: ["Python", "HTML", "C++", "PHP"],
        correta: "HTML"
    },
    {
        enunciado: "Qual propriedade CSS altera a cor de fundo de um elemento?",
        alternativas: ["color", "font-size", "background-color", "border"],
        correta: "background-color"
    },
    {
        enunciado: "O que o comando SQL 'SELECT' faz?",
        alternativas: ["Deleta dados", "Insere dados", "Atualiza dados", "Busca dados"],
        correta: "Busca dados"
    }
];
// --- RANKING FAKE ---
let ranking = [
    { usuario: "Alana", pontos: 30 },
    { usuario: "Dev_Misterioso", pontos: 10 }
];
//------------------------------------------------------------

//--- VARIÁVEIS DE CONTROLE ---
let nomeJogador = "";
let idPerguntaAtual = 0;
let pontuacao = 0;

// ---INICIO DO JOGO---
btnComecar.addEventListener('click', () =>  {
    //valida o campo de nome
    if (inputNome.value.trim() ==='') {
        alert("Por favor, digite seu nome!");
        return;
    }
    nomeJogador = inputNome.value;

    //troca telas
    secaoInicial.classList.add('hidden');
    secaoJogo.classList.remove('hidden');

    carregarPerguntas();
});

//---FUNÇÃO PARA CARREGAR AS PERGUNTAS---
function carregarPerguntas(){
    //limpa alternativas anteriores, começa zerada
    alternativas.innerHTML = "";

    //resgata os dados da pergunta atual
    const dadosPergunta = perguntas[idPerguntaAtual];

    //atualiza o enunciado
    textoPergunta.innerText = dadosPergunta.enunciado;

    //BOTÕES DE ALTERNATIVAS
    dadosPergunta.alternativas.forEach(alternativa => {
        const botao = document.createElement('button');
        botao.innerText = alternativa;

        //aplica a classe do css
        botao.classList.add('botao-alternativas');

        //coloca o botão dentro da div das perguntas
        alternativas.appendChild(botao);

        //verifica se a resposta está correta
        botao.addEventListener('click', () => verificarResposta(alternativa));

    });
}

//---FUNÇÃO PARA VERIFICAR A RESPOSTA---
function verificarResposta (alternativaSelecionada) {
    const perguntaAtual = perguntas[idPerguntaAtual];
    if (alternativaSelecionada === perguntaAtual.correta) {
        pontuacao += 10;
        alert("Acertou! +10 pontos.");
    } else {
        alert(`Errado! A alternativa correta é ${perguntaAtual.correta}`);
    }

    idPerguntaAtual ++;

    //verifica se ainda existem perguntas na lista
    if (idPerguntaAtual < perguntas.length) {
        carregarPerguntas();
    } else { 
        finalizarJogo(); 
    }
}

//---FUNÇÃO PARA FINALIZAR O JOGO---
function finalizarJogo() {
    //troca telas
    secaoJogo.classList.add('hidden');
    secaoPlacar.classList.remove('hidden');

    //simulação de nova linha no db
    const novoResultado = {
        usuario: nomeJogador,
        pontos: pontuacao
    };

    //adiciona o jogador atual ao ranking
    ranking.push(novoResultado);

    //simula o order by
    ranking.sort((a, b) => b.pontos - a.pontos);

    atualizarTabelaPlacar();
}

//---FUNÇÃO PARA ATUALIZAR A TABELA---
function atualizarTabelaPlacar() {
    corpoRanking.innerHTML = "";

    //cria linha para cada jogador
    ranking.forEach(jogador => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
        <td>${jogador.usuario}</td>
        <td>${jogador.pontos}</td>
        `;
        
        //coloca a linha dentro do corpo da tabela
        corpoRanking.appendChild(linha);
    });
}

//---BOTÃO PARA REINICIAR---
btnReiniciar.addEventListener('click', () => {
    //troca tela
    secaoPlacar.classList.add('hidden');
    secaoInicial.classList.remove('hidden');

    //reinicia as variáveis de controle
    inputNome.value = "";
    idPerguntaAtual = 0;
    pontuacao = 0;
});