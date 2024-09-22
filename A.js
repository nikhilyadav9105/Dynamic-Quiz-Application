const quizData = [
  {
      question: "What is the purpose of the <div> tag ?",
      options: ["To create a table", "To create a list", "To divide content", "To create a link"],
      answer: "To divide content",
      hint: "Content division",
      userAnswer: null
  },
  {
      question: " What is the purpose of the display property ?",
      options: ["To set font size", "To set background color", "To control element display", "To set border style"],
      answer: "To control element display",
      hint: "Element visiblity",
      userAnswer: null
  },
  {
    question: "What is the purpose of the console.log() function ?",
    options: ["To create an alert box","To display output in console","To prompt user input","To confirm user action"],
    answer : "To display output in console",
    hint: "Debugging output",
    userAnswer: null
  },
  {
    question: "How do you declare a variable in JavaScript ?",
    options: ["let","var","const","All of the above"],
    answer : "All of the above",
    hint: "Variable declaration",
    userAnswer: null
  },
  {
    question: "How do you comment a line in JavaScript ?",
    options: ["//","/*","/","<!--"],
    answer : "//",
    hint: "Code comments",
    userAnswer: null
  },
  
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // Total time for the quiz
let timerInterval; // Store the interval ID
let isPaused = false; // State variable to track pause status
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Sound effects
const correctSound = new Audio('correctanswer.mp3');
const incorrectSound = new Audio('wronganswer.mp3');

// Shuffle the quiz data
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start timer
function startTimer() {
  timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          alert('Time is up!');
          showResult();
      } else {
          document.getElementById('timer').innerText = `Time Left: ${timeLeft--} seconds`;
      }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
}

// Resume timer
function resumeTimer() {
  if (isPaused) {
      startTimer();
      isPaused = false;
  }
}

// Show question
function showQuestion(index) {
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  questionEl.innerText = quizData[index].question;

  optionsEl.innerHTML = '';
  quizData[index].options.forEach((option) => {
      optionsEl.innerHTML += `<label class="answer-option"><input type="radio" name="option" value="${option}"> ${option}</label><br>`;
  });
}

// Show hint
function showHint() {
  alert(quizData[currentQuestionIndex].hint);
}

// Provide feedback for selected answer
function provideFeedback(selectedOption, correct) {
  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(option => {
      const label = option.parentElement;
      if (option.value === quizData[currentQuestionIndex].answer) {
          label.classList.add('correct');
      } else if (option === selectedOption) {
          label.classList.add('incorrect');
      }
  });

  if (correct) {
      correctSound.play(); // Play correct sound
      alert('Correct!');
  } else {
      incorrectSound.play(); // Play incorrect sound
      alert('Incorrect! The correct answer is: ' + quizData[currentQuestionIndex].answer);
  }
}

// Next question button event listener
document.getElementById('next-btn').addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
      alert('Please select an answer!');
      return;
  }

  // Store the user's answer
  quizData[currentQuestionIndex].userAnswer = selectedOption.value;

  const isCorrect = selectedOption.value === quizData[currentQuestionIndex].answer;
  if (isCorrect) {
      score++;
  }

  provideFeedback(selectedOption, isCorrect);

  currentQuestionIndex++;
  setTimeout(() => {
      if (currentQuestionIndex < quizData.length) {
          showQuestion(currentQuestionIndex);
      } else {
          showResult();
      }
  }, 1500); // Wait for feedback before moving to next question
});

// Previous question button event listener
document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
  }
});

// Show results function
function showResult() {
  clearInterval(timerInterval); // Clear timer when showing results
  document.getElementById('question-section').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  document.getElementById('score').innerText = `Your score: ${score}/${quizData.length}`;

  const reviewEl = document.getElementById('review-section');
  reviewEl.innerHTML = ''; // Clear previous review

  quizData.forEach((question, index) => {
      const correct = question.userAnswer === question.answer ? 'Correct' : 'Incorrect';
      reviewEl.innerHTML += `
          <div class="review-item">
              <h4>${index + 1}. ${question.question}</h4>
              <p>Your answer: ${question.userAnswer || 'None selected'}</p>
              <p>Correct answer: ${question.answer}</p>
              <p>Status: ${correct}</p>
          </div>
      `;
  });

  // Save high score
  saveHighScore();
}

// Save high score to local storage
function saveHighScore() {
  const name = prompt("Enter your name for the high score:");
  if (name) {
      highScores.push({ name, score });
      highScores.sort((a, b) => b.score - a.score);
      highScores = highScores.slice(0, 5); // Keep only top 5
      localStorage.setItem('highScores', JSON.stringify(highScores));
  }
}

// Restart quiz button event listener
document.getElementById('restart-btn').addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  quizData.forEach(q => q.userAnswer = null); // Reset user answers
  timeLeft = 60; // Reset timer
  document.getElementById('timer').innerText = `Time Left: ${timeLeft} seconds`; // Reset display
  showQuestion(currentQuestionIndex);
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('question-section').style.display = 'block';
});

// Reset high scores button event listener
document.getElementById('reset-scores-btn').addEventListener('click', () => {
  if (confirm("Are you sure you want to reset high scores?")) {
      localStorage.removeItem('highScores');
      highScores = [];
      alert("High scores reset!");
  }
});

// Shuffle the quiz data
shuffle(quizData);

// Initialize quiz
showQuestion(currentQuestionIndex);
startTimer(); // Start the timer

// Show hint button event listener
document.getElementById('hint-btn').addEventListener('click', showHint);

// Event listeners for pause and resume buttons
document.getElementById('pause-btn').addEventListener('click', () => {
  pauseTimer();
  document.getElementById('pause-btn').style.display = 'none';
  document.getElementById('resume-btn').style.display = 'inline';
});

document.getElementById('resume-btn').addEventListener('click', () => {
  resumeTimer();
  document.getElementById('resume-btn').style.display = 'none';
  document.getElementById('pause-btn').style.display = 'inline';
});

const heading = document.getElementById('heading');

heading.addEventListener('mouseover', () => {
  heading.style.transform = 'scale(1.2)';
  heading.style.color = 'black';
});

heading.addEventListener('mouseout', () => {
  heading.style.transform = 'scale(1)';
  heading.style.color = 'black';
});

