// 상태 변수
let coins = 0;
const maxCoins = 3;

// 재미있는 수수께끼 문제
const questions = {
    1: {
        question: "항상 뒤에만 따라다니는 것은?",
        answer: "그림자",
        hint: "빛이 있을 때 항상 존재하는 것",
        hintsUsed: 0
    },
    2: {
        question: "입이 있지만 먹지 못하는 것은?",
        answer: "강",
        hint: "물이 흐르는 장소",
        hintsUsed: 0
    },
    3: {
        question: "깨뜨리지 않고는 가질 수 없는 것은?",
        answer: "달걀",
        hint: "속을 보기 위해 깨야 하는 것",
        hintsUsed: 0
    }
};

// HTML 요소 선택
const startPage = document.getElementById("start-page");
const quizSelection = document.getElementById("quiz-selection");
const quizPage = document.getElementById("quiz-page");
const successPage = document.getElementById("success-page");

const coinDisplay = document.getElementById("coin-display");
const coinCount = document.getElementById("coin-count");
const coinAnimation = document.getElementById("coin-animation");

const startButton = document.getElementById("start-button");
const quizButtons = document.querySelectorAll(".quiz-button");
const backButton = document.getElementById("back-button");
const restartButton = document.getElementById("restart-button");

const quizQuestion = document.getElementById("quiz-question");
const userAnswer = document.getElementById("user-answer");
const submitAnswerButton = document.getElementById("submit-answer");
const feedbackMessage = document.getElementById("feedback-message");
const hintButton = document.getElementById("hint-button");
const hintMessage = document.getElementById("hint-message");
const hintText = document.getElementById("hint");

// 현재 문제 ID
let currentQuestionId = null;

// 화면 전환 함수
function showPage(page) {
    [startPage, quizSelection, quizPage, successPage].forEach(p => p.classList.add("hidden"));
    page.classList.remove("hidden");
}

// 코인 업데이트
function updateCoinDisplay() {
    coinCount.textContent = coins;
}

// 코인 애니메이션
function triggerCoinAnimation() {
    coinAnimation.classList.remove("hidden");
    setTimeout(() => {
        coinAnimation.classList.add("hidden");
    }, 1000);
}

// 시작 버튼
startButton.addEventListener("click", () => showPage(quizSelection));

// 문제 선택 버튼
quizButtons.forEach(button => {
    button.addEventListener("click", () => {
        const questionId = button.getAttribute("data-question");
        loadQuestion(questionId);
    });
});

// 뒤로 가기 버튼
backButton.addEventListener("click", () => showPage(quizSelection));

// 다시 시작
restartButton.addEventListener("click", () => {
    coins = 0;
    Object.keys(questions).forEach(key => (questions[key].hintsUsed = 0));
    quizButtons.forEach(button => button.disabled = false);
    updateCoinDisplay();
    showPage(startPage);
});

// 문제 로드
function loadQuestion(questionId) {
    currentQuestionId = questionId;
    const questionData = questions[questionId];
    quizQuestion.textContent = questionData.question;
    userAnswer.value = ""; // 입력 필드 초기화
    feedbackMessage.classList.add("hidden");
    hintMessage.classList.add("hidden");
    hintButton.classList.add("hidden");
    if (questionData.hintsUsed < 3) {
        hintButton.classList.remove("hidden");
    }
    showPage(quizPage);
}

// 정답 제출
submitAnswerButton.addEventListener("click", () => {
    const questionData = questions[currentQuestionId];
    const userResponse = userAnswer.value.trim();

    if (userResponse === questionData.answer) {
        coins++;
        triggerCoinAnimation();
        updateCoinDisplay();
        alert("정답입니다! 코인을 획득했습니다.");
        document.querySelector(`.quiz-button[data-question="${currentQuestionId}"]`).disabled = true;

        if (coins >= maxCoins) {
            showPage(successPage);
        } else {
            showPage(quizSelection);
        }
    } else {
        feedbackMessage.textContent = "오답입니다.";
        feedbackMessage.classList.remove("hidden");
    }
});

// 힌트 버튼
hintButton.addEventListener("click", () => {
    const questionData = questions[currentQuestionId];
    if (questionData.hintsUsed < 3) {
        hintText.textContent = questionData.hint;
        hintMessage.classList.remove("hidden");
        questionData.hintsUsed++;
    }
});
