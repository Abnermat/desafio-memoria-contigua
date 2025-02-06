document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const startButton = document.getElementById("start-game");
    const questionBox = document.getElementById("question-box");
    const questionText = document.getElementById("question-text");
    const answerInput = document.getElementById("answer-input");
    const submitAnswer = document.getElementById("submit-answer");
    const statusMessage = document.getElementById("status-message");

    let currentPosition = [0, 0]; // Posição inicial [linha, coluna]
    let matrixSize = 5; // Tamanho da matriz 5x5
    let questions = [
        { question: "Qual é o índice do primeiro elemento em um vetor?", answer: "0" },
        { question: "Quantas colunas tem uma matriz 3x3?", answer: "3" },
        { question: "Qual a posição do número 12 em um vetor [10, 11, 12, 13]?", answer: "2" },
        { question: "Se uma matriz tem 2 linhas e 4 colunas, quantos elementos ela armazena?", answer: "8" },
        { question: "Qual índice acessa o elemento da terceira linha e segunda coluna de uma matriz?", answer: "[2][1]" }
    ];

    function createBoard() {
        board.innerHTML = "";
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                let cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.textContent = i * matrixSize + j;
                board.appendChild(cell);
            }
        }
        highlightCurrentPosition();
    }

    function highlightCurrentPosition() {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("active");
            if (parseInt(cell.dataset.row) === currentPosition[0] &&
                parseInt(cell.dataset.col) === currentPosition[1]) {
                cell.classList.add("active");
            }
        });
    }

    function askQuestion() {
        let randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        questionText.textContent = randomQuestion.question;
        questionBox.classList.remove("hidden");

        submitAnswer.onclick = function () {
            if (answerInput.value.trim() === randomQuestion.answer) {
                moveForward();
                statusMessage.textContent = "Resposta correta! Você avançou!";
            } else {
                statusMessage.textContent = "Resposta incorreta. Tente novamente!";
            }
            answerInput.value = "";
            questionBox.classList.add("hidden");
            highlightCurrentPosition();
            checkWinCondition();
        };
    }

    function moveForward() {
        if (currentPosition[1] < matrixSize - 1) {
            currentPosition[1]++;
        } else if (currentPosition[0] < matrixSize - 1) {
            currentPosition[0]++;
            currentPosition[1] = 0;
        }
    }

    function checkWinCondition() {
        if (currentPosition[0] === matrixSize - 1 && currentPosition[1] === matrixSize - 1) {
            statusMessage.textContent = "Parabéns! Você concluiu o desafio!";
            startButton.disabled = false;
        }
    }

    startButton.addEventListener("click", () => {
        currentPosition = [0, 0];
        startButton.disabled = true;
        createBoard();
        statusMessage.textContent = "";
        askQuestion();
    });

    board.addEventListener("click", askQuestion);
});
