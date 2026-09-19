export type Question = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  category: string;
};

export type QuizQuestion = {
  id: number;
  questionText: string;
  category: string;
  options: string[];
  correctAnswerIndex: number;
};

export type ActiveQuiz = {
  questions: QuizQuestion[];
  userAnswers: (number | null)[];
  startedAt: string;
};

export type CategoryBreakdown = Record<string, { correct: number; total: number }>;

export type QuizResult = {
  score: number;
  total: number;
  percentage: number;
  categoryBreakdown: CategoryBreakdown;
  completedAt: string;
};
