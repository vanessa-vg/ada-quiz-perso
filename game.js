import {quiz_culture_g} from './questions.js';

// Variable pour suivre l'état du quiz
let  currentQuestionIndex = 0;
let answerSelected = false;
let score = 0;

// Récupérer les emplacements pour injecter la question,les options et le bouton Suivant
const questionContainer = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
b
// Fonction pour afficher une question basée sur l'index actuel
function loadQuestion() {
    // Vider le conteneur des options
    optionsContainer.innerHTML = '';
    // Réinitialisation
    answerSelected = false;

// Récupérer la question actuelle
const currentQuestion = quiz_culture_g.questions[currentQuestionIndex];

// Injecter le texte de la question dans l'emplacement dédié
questionContainer.innerText = currentQuestion.text;

// Pour chaque option, créer un bouton et l'ajouter au conteneur PUIS Injecter les options dans le HTML
currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('option-button');
    optionsContainer.appendChild(button);

// Ajoute l'événement pour vérifier la réponse
    button.addEventListener('click', () => checkAnswer(button, currentQuestion.correct_answer));
    optionsContainer.appendChild(button);

});
// Désactiver le bouton Suivant au début
    nextButton.disabled = true;
}

// Ajoute un écouteur d'événement pour le bouton "Suivant"

nextButton.addEventListener('click' , () => {
    // Incrémenter l'index de la question
    currentQuestionIndex++;
    
    // Vérifier s'il reste des questions
    if (currentQuestionIndex < quiz_culture_g.questions.length) {
        // Afficher la question suivante
        loadQuestion();
    } else {
        // Si plus de questions, indiquer la fin du quiz
        questionContainer.innerText = `Quiz terminé ! 🎉 Score final: ${score}/${quiz_culture_g.questions.length}`;
        function lancerConfettis() {
            confetti();
        }
        lancerConfettis();
        let message = '';
        if (score === quiz_culture_g.questions.length) {
            message = 'Bravo ! Parfait 🎯';
        } else if (score > quiz_culture_g.questions.length / 2) {
            message = 'Bien joué ! 👍';
        } else {
            message = 'Peut mieux faire 💪';
        }

        optionsContainer.innerText = ''; // Effacer les options
        nextButton.style.display = 'none'; // Cacher le bouton Suivant
        replayButton.style.display = 'inline-block'; // Afficher le bouton Rejouer
    }

});

// Charger la première question au chargement de la page
loadQuestion();

replayButton.addEventListener('click' , () => {
    // Réinitialiser l'index
    currentQuestionIndex = 0;
    score = 0;

    // Cacher le bouton rejouer et afficher le bouton Suivant
    replayButton.style.display = 'none';
    nextButton.style.display = 'inline-block';

    // Recharger la première question
    loadQuestion();
})

// Ajout de la fonction checkAnswer
function checkAnswer(button, correct_answer) {
    if (answerSelected) return; // Empeche de cliquer plusieurs fois
    answerSelected = true;

    const allButtons = document.querySelectorAll('.option-button');

    // Désactive tous les boutons pour éviter plusieurs clics
    allButtons.forEach(btn => btn.disabled = true);

    if (button.innerText.trim() === correct_answer.trim()) {
        button.style.border = '3px solid green';
        score++;
    } else {
        button.style.border = '3px solid red';
        allButtons.forEach( btn => {
            if (btn.innerText.trim() === correct_answer.trim()) {
                btn.style.border = '3px solid green';
            }
        });
    }
    //Affiche le score après chaque question (optionnel)
    console.log(`Score actuel: ${score}`);

    // Activer le bouton Suivant
    nextButton.disabled = false;
}