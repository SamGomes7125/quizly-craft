import type { ActiveQuiz, Question, QuizQuestion } from "./quiz.types";

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateRandomQuiz(bank: Question[], count = 5): ActiveQuiz {
  const shuffledBank = shuffleArray(bank);
  const selected = shuffledBank.slice(0, count);

  const questions: QuizQuestion[] = selected.map((question) => {
    const correctAnswer = question.options[question.correctAnswerIndex];
    const shuffledOptions = shuffleArray(question.options);
    const shuffledCorrectIndex = shuffledOptions.indexOf(correctAnswer);

    return {
      id: question.id,
      questionText: question.questionText,
      category: question.category,
      options: shuffledOptions,
      correctAnswerIndex: shuffledCorrectIndex,
    };
  });

  return {
    questions,
    userAnswers: Array(count).fill(null),
    startedAt: new Date().toISOString(),
  };
}

export function calculateScore(activeQuiz: ActiveQuiz): number {
  return activeQuiz.questions.reduce((score, question, index) => {
    return score + (activeQuiz.userAnswers[index] === question.correctAnswerIndex ? 1 : 0);
  }, 0);
}
