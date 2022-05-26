const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availabeQuestions =[]; 
let questions = [
    {
   question: "BGMI is developed by which company?",
    choice1: "Krafton",
    choice2: "EA Games",
    choice3: "Gameloft",
    choice4: "Tencent",
    answer: 1
    },
    {
        question: "When was the first eSports tournament??",
         choice1: " 1982 ",
         choice2: " 1972 ",
         choice3: " 1992 ",
         choice4: " 2002 ",
         answer: 2
    },
    {
        question: "	Who is the first Indian woman to win an Asian Games gold in 400m run? ",
         choice1: " M.L.Valsamma",
         choice2: " P.T.Usha",
         choice3: " Kamaljit Sandhu",
         choice4: " K.Malleshwari",
         answer: 3 
    },
    {
        question: " What does the character Popeye famously eat to boost his strength?",
         choice1: "Chicken",
         choice2: "Spinach",
         choice3: "Potato ",
         choice4: "Papaya ",
         answer: 2
    },
    {
        question: "	The 'Dronacharya Award' is given to...? ",
         choice1: " Sportsmen ",
         choice2: " Coaches ",
         choice3: " Umpires ",
         choice4: " Sports Editors ",
         answer: 2
    }
];
  
//constants
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

 startGame = () => {
    questionCounter = 0;
    score =0;
    availabeQuestions= [...questions];
    console.log(availabeQuestions);
    getNewQuestion();
  };
  getNewQuestion = () => {
      if(availabeQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ){
        localStorage.setItem('mostRecentScore',score);
        //go to the end page
        return window.location.assign("/end.html");
      }
      questionCounter++;
      progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
      progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
      
      const questionIndex = Math.floor(Math.random() * availabeQuestions.length);
      currentQuestion = availabeQuestions[questionIndex];
      question.innerText = currentQuestion.question;
     
      choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]; 
      });

      availabeQuestions.splice(questionIndex, 1);
      console.log(availabeQuestions);
      acceptingAnswers= true;
    };
    choices.forEach(choice => { 
      choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ?  "correct" : "incorrect";
       
        if(classToApply === "correct"){
          incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
           selectedChoice.parentElement.classList.remove(classToApply);
           getNewQuestion();
        }, 1000);
          
      });
    })

   incrementScore =  num => {
     score +=num;
     scoreText.innerText = score;
   }
    startGame();
 
 