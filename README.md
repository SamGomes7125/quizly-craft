# QuizCraft Challenges

Build a quiz app called "QuizCraft" using React and localStorage (no backend/auth needed).

CONCEPT:

A simple quiz app where users take a random 5-question quiz pulled from a fixed 

25-question bank, then see their score and a review of right/wrong answers.

QUESTION BANK:

Seed the following 25 questions into localStorage on first load (key: "questionBank"). 

Only seed once — check if it already exists before overwriting:

[

  { "id": 1, "questionText": "What is the capital of France?", "options": ["Berlin", "Madrid", "Paris", "Rome"], "correctAnswerIndex": 2, "category": "Geography" },

  { "id": 2, "questionText": "How many continents are there on Earth?", "options": ["5", "6", "7", "8"], "correctAnswerIndex": 2, "category": "Geography" },

  { "id": 3, "questionText": "What is the largest planet in our solar system?", "options": ["Earth", "Jupiter", "Saturn", "Mars"], "correctAnswerIndex": 1, "category": "Science" },

  { "id": 4, "questionText": "What gas do plants absorb from the atmosphere for photosynthesis?", "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], "correctAnswerIndex": 2, "category": "Science" },

  { "id": 5, "questionText": "What is the chemical symbol for water?", "options": ["H2O", "CO2", "O2", "NaCl"], "correctAnswerIndex": 0, "category": "Science" },

  { "id": 6, "questionText": "Who wrote the play 'Romeo and Juliet'?", "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], "correctAnswerIndex": 1, "category": "Literature" },

  { "id": 7, "questionText": "What is the smallest prime number?", "options": ["0", "1", "2", "3"], "correctAnswerIndex": 2, "category": "Math" },

  { "id": 8, "questionText": "What is 7 multiplied by 8?", "options": ["54", "56", "58", "64"], "correctAnswerIndex": 1, "category": "Math" },

  { "id": 9, "questionText": "Which ocean is the largest in the world?", "options": ["Atlantic", "Indian", "Arctic", "Pacific"], "correctAnswerIndex": 3, "category": "Geography" },

  { "id": 10, "questionText": "What is the powerhouse of the cell?", "options": ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"], "correctAnswerIndex": 1, "category": "Science" },

  { "id": 11, "questionText": "In what year did World War II end?", "options": ["1943", "1944", "1945", "1946"], "correctAnswerIndex": 2, "category": "History" },

  { "id": 12, "questionText": "What is the square root of 64?", "options": ["6", "7", "8", "9"], "correctAnswerIndex": 2, "category": "Math" },

  { "id": 13, "questionText": "Who painted the Mona Lisa?", "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], "correctAnswerIndex": 2, "category": "Art" },

  { "id": 14, "questionText": "What is the freezing point of water in Celsius?", "options": ["-10°C", "0°C", "10°C", "32°C"], "correctAnswerIndex": 1, "category": "Science" },

  { "id": 15, "questionText": "Which country is home to the kangaroo?", "options": ["South Africa", "Australia", "Brazil", "India"], "correctAnswerIndex": 1, "category": "Geography" },

  { "id": 16, "questionText": "What is the longest river in the world?", "options": ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"], "correctAnswerIndex": 2, "category": "Geography" },

  { "id": 17, "questionText": "How many sides does a hexagon have?", "options": ["5", "6", "7", "8"], "correctAnswerIndex": 1, "category": "Math" },

  { "id": 18, "questionText": "Who was the first President of the United States?", "options": ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"], "correctAnswerIndex": 2, "category": "History" },

  { "id": 19, "questionText": "What is the main language spoken in Brazil?", "options": ["Spanish", "Portuguese", "French", "Italian"], "correctAnswerIndex": 1, "category": "Geography" },

  { "id": 20, "questionText": "What organ in the human body pumps blood?", "options": ["Lungs", "Liver", "Heart", "Kidney"], "correctAnswerIndex": 2, "category": "Science" },

  { "id": 21, "questionText": "What is 15% of 200?", "options": ["20", "25", "30", "35"], "correctAnswerIndex": 2, "category": "Math" },

  { "id": 22, "questionText": "Which planet is known as the Red Planet?", "options": ["Venus", "Mars", "Jupiter", "Mercury"], "correctAnswerIndex": 1, "category": "Science" },

  { "id": 23, "questionText": "Who developed the theory of relativity?", "options": ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"], "correctAnswerIndex": 2, "category": "Science" },

  { "id": 24, "questionText": "What is the capital city of Japan?", "options": ["Seoul", "Beijing", "Tokyo", "Bangkok"], "correctAnswerIndex": 2, "category": "Geography" },

  { "id": 25, "questionText": "How many players are on a standard soccer team on the field at once?", "options": ["9", "10", "11", "12"], "correctAnswerIndex": 2, "category": "General Knowledge" }

]

CORE FEATURES:

1. Home page:

   - App title "QuizCraft" with a short tagline (e.g., "Test your knowledge with 

     5 random questions")

   - Show total questions available (e.g., "25 questions in the bank")

   - "Start New Quiz" button

   - Clean, welcoming empty-state style layout (this is the only page before a quiz starts)

2. Quiz generation logic:

   - When "Start New Quiz" is clicked, randomly select 5 unique questions from the 

     25-question bank (no duplicates within a quiz)

   - Shuffle the order of the 4 answer options for each question so the correct 

     answer isn't always in the same position

   - Store this random 5-question set as the "active quiz" for the session

3. Take Quiz page:

   - Show one question at a time with 4 clickable answer options

   - Progress indicator (e.g., "Question 2 of 5")

   - "Next" button (disabled until an answer is selected)

   - On the last question, button says "Finish Quiz"

4. Results page:

   - Show score (e.g., "4/5 - 80%")

   - A review list of every question showing: the question, the user's selected 

     answer, the correct answer, and a green/red indicator for correct/incorrect

   - Optional: small breakdown by category (e.g., "Science: 2/2, Math: 1/2")

   - "Try Another Random Quiz" button (generates a fresh random 5) and "Back to Home"

DATA MODEL (localStorage):

- "questionBank": the seeded array of 25 questions (seed once, don't overwrite)

- "activeQuiz": the current random 5-question set with shuffled options

- Optionally "quizHistory": an array of past attempts (score, date) for a future 

  history feature

DESIGN:

- Clean, modern UI with a card-based layout

- Calm color palette (blues/purples) with a clear accent color for correct/incorrect 

  feedback (green/red)

- Rounded corners, soft shadows, good spacing

- Mobile responsive

- Smooth transitions between questions

Keep this focused on Home → Take Quiz → Results only. No login, no manual quiz 

creation, no backend calls.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://quizly-craft.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4408c17e-31e2-4256-a9ad-d780b4c8d117).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
