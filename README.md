# Dynamic Quiz Application

## Overview

The Dynamic Quiz Application is an interactive and user-friendly quiz platform developed using Vanilla JavaScript, HTML, and CSS. The application allows users to take a quiz with randomized questions, track their progress with real-time feedback, and view results at the end. The app features a timer, hint option, sound effects for correct/incorrect answers, and dynamic high score tracking.

## Features

### 1. Dynamic Quiz Functionality

Questions are displayed one at a time, and users can navigate between them.
Questions are randomized to provide a unique experience each time.
Users can select answers, change them before submission, and view immediate feedback.
Option to review the entire quiz at the end.

### 2. Timer

 A countdown timer starts when the quiz begins.
 Users can pause and resume the timer.
 The quiz auto-submits when time runs out.

### 3. Hints

 Each question can have a hint that the user can request to assist them.

### 4. Feedback and Scoring

 Immediate feedback after answering, showing whether the answer is correct or incorrect.
 Visual feedback with color-coded highlights (green for correct, red for incorrect).
 Sound effects for correct and incorrect answers to make the experience more engaging.

### 5. High Score Management

 High scores are stored in the browser’s `localStorage`.
 Displays the top 5 high scores with names and scores.
 Users can reset high scores if desired.

### 6. Responsive Design and Accessibility

 The app is fully responsive, working seamlessly on mobile, tablet, and desktop devices.
 Accessible keyboard navigation and clear instructions.

### 7. Review and Progress

 A review section at the end allows users to review their answers and see their mistakes.
 A progress bar visually represents the user's current position in the quiz.


### Explanation of Files

 index.html: Defines the structure of the application, including quiz questions, options, navigation buttons, and result display sections.
 styles.css: Contains the CSS rules for layout, colors, fonts, and responsive design.
 script.js: Handles the main logic, including question display, answer validation, hint display, scoring, timer, feedback, and high score storage.
 correct.mp3 & incorrect.mp3: Audio files for feedback on user selections (correct/incorrect answers).
 README.md: Documentation file explaining the project, its structure, and usage.

## How to Run

1. Download or clone the repository to your local machine.
2. Open the `index.html` file in a web browser.
3. The quiz will automatically start, and users can begin interacting with it.


## How to Play

1. The quiz will start with a timer displayed at the top.
2. Users can select an answer for each question and navigate through the quiz using Next and Previous buttons.
3. Hint button allows users to get a hint for each question.
4. After answering, the selected option is highlighted:
   - Green for correct answers.
   - Red for incorrect answers.
5. Immediate feedback is provided with sound and a notification alert.
6. Once all questions are answered (or time runs out), the quiz will automatically submit, and the user will see their final score.
7. Users can review their answers and check their mistakes at the end.

## Customization

### Adding or Modifying Questions
To modify or add new quiz questions, open the `A.js` file and modify the `quizData` array. Each question object follows this format:
```javascript
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris",
        hint: "It's known as the City of Light."
    },
    // Add more questions here
];


