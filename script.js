const startButton = document.getElementById('btn-start');
const nextButton = document.getElementById('btn-next');
const questionContainerElement = document.getElementById('questoes-cont');
const questionElement = document.getElementById('questoes');
const answersButtonsElement = document.getElementById('botaoperg');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  // Pede o nome do jogador
  const playerName = prompt('Bem-vindo ao NetQUIZ! Por favor, insira seu nome:');
  
  if (playerName === null || playerName.trim() === '') {
    alert('Por favor, insira um nome válido para começar o jogo.');
    return;
  }

  // Exibe uma mensagem de boas-vindas personalizada
  alert(`Olá, ${playerName}! Bem-vindo ao NetQUIZ. Boa sorte!`);
  
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerHTML = '';
  while (answersButtonsElement.firstChild) {
    answersButtonsElement.removeChild(answersButtonsElement.firstChild);
  }

  // Exibe a imagem
  const image = document.createElement('img');
  image.src = question.imageUrl;
  image.classList.add('question-image');
  questionElement.appendChild(image);

  // Exibe a pergunta
  const questionText = document.createElement('div');
  questionText.innerText = question.question;
  questionElement.appendChild(questionText);

  // Exibe as opções de resposta
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answersButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answersButtonsElement.firstChild) {
    answersButtonsElement.removeChild(answersButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  
  setStatusClass(selectedButton, correct);

  if (correct) {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'REINICIAR';
      startButton.classList.remove('hide');
    }
  } else {
    // A resposta está errada, mostre um alerta e volte ao início
    alert('Resposta incorreta. Tente Novamente :))');
    startButton.innerText = 'JOGAR'; // Altera o texto do botão para "JOGAR"
    startButton.classList.remove('hide'); // Exibe o botão "JOGAR"
    questionContainerElement.classList.add('hide'); // Esconde o container de perguntas
  }
}

function setStatusClass(element, correct){
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    imageUrl: 'https://listasnerds.com.br/wp-content/uploads/2021/12/ate-o-ultimo-homem-123-850x560.jpg',
    question: 'QUAL É O NOME DO FILME?',
    answers: [
      { text: 'Até o Ultimo Homem', correct: true },
      { text: 'Coração de Ferro', correct: false },
      { text: 'Desafio das Águias', correct: false },
    ]
  }, 
  {
    imageUrl:'https://i.pinimg.com/originals/3b/79/d9/3b79d9b8948c985b4dc86e219564d69f.jpg',
    question: 'QUAL O NOME DESSE PERSONAGEM?',
    answers: [
      { text: 'Capitão Fábio', correct: false },
      { text: 'Capitão Mathias', correct: false },
      { text: 'Capitão Nascimento', correct: true },
    ]
  },
  {
    imageUrl: 'https://ogimg.infoglobo.com.br/in/21632174-e3e-97c/FT1086A/Cidade-de-Deus-foto-arma-cred.-Cesar-Charlone.jpg',
    question: 'O FILME SE PASSA EM QUAL ESTADO DO BRASIL?',
    answers: [
      { text: 'Rio Grando do Norte', correct: false },
      { text: 'Rio de Janeiro', correct: true },
      { text: 'São Paulo', correct: false },
    ]
  },
  {
    imageUrl: 'https://cdn.culturagenial.com/imagens/livro-o-menino-do-pijama-listrado-og.jpg',
    question: 'O FILME REMETE A QUE MOMENTO HISTÓRICO?',
    answers: [
      { text: 'Segunda Guerra Mundial', correct: true },
      { text: 'Primeira Guerra Mundial', correct: false },
      { text: 'Guerra dos Cem Anos', correct: false },
    ]
  },
  {
    imageUrl: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABXCeNmQPDQPKzm851_pZ5DloFfAZPG31S190CCYJ7Zg5bzmWyiLxjSVYLDTYNxq8poYfmy3dFQmaR9ILFWBLhZhnX3hihorxXF_Q.jpg?r=071',
    question: 'O FILME É UMA HOMENAGEM A:',
    answers: [
      { text: 'Avó do protagonista', correct: false },
      { text: 'Mãe do protagonista', correct: true },
      { text: 'Tia do protagonista', correct: false },
    ]
  }
]
