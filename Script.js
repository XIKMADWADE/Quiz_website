// declaration
const questionElm = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn")

// function
const questions = [
    {
        question : "Which is larget animal in the world?",
        answers : [
            {text : "shark", correct : false},
            {text : "Blue whale", correct : true},
            {text : "Elephant", correct : false},
            {text : "Giraffe", correct : false},
        ]
    },
    {
        question : "Which is Largest country in the world?",
        answers : [
            {text : "USA", correct : true},
            {text : "Canada", correct : false},
            {text : "somali", correct : false},
            {text : "yemen", correct : false},
        ]
    },
    {
        question : "Which is larget desert in the world?",
        answers : [
            {text : "Kalahari", correct : false},
            {text : "Gobi", correct : false},
            {text : "Sahara", correct : false},
            {text : "Antarctica", correct : true},
        ]
    },
    {
        question : "Which is the smallest continent in the world",
        answers : [
            {text : "Asia", correct : false},
            {text : "Australlia", correct : true},
            {text : "Arcatic", correct : false},
            {text : "Africa", correct : false},
        ]
    },
];

let currentQueationIndex = 0;
let score = 0;
function startQuiz(){
    currentQueationIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQueation = questions[currentQueationIndex];
    let questionNo = currentQueationIndex + 1;
    questionElm.innerHTML = questionNo + " . " + currentQueation.question;

    currentQueation.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
     questionElm.innerHTML = `You scored ${score} out of ${questions.lenth}!`;
     nextButton.innerHTML = "Play Again";
     nextButton.style.display = "block";
}

function handleNextButton(){
    currentQueationIndex++;
    if(currentQueationIndex < questions.length){
        showQuestion();
    }else
    showScore();
}

nextButton.addEventListener("click", ()=>{
    if(currentQueationIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

