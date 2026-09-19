import { QUESTION_BANK } from "./quiz.data";
import type { ActiveQuiz, Question, QuizResult } from "./quiz.types";

const STORAGE_KEYS = {
  questionBank: "questionBank",
  activeQuiz: "activeQuiz",
  quizHistory: "quizHistory",
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors (e.g. quota exceeded).
  }
}

export function seedQuestionBank(): void {
  if (!isBrowser()) return;
  if (!localStorage.getItem(STORAGE_KEYS.questionBank)) {
    localStorage.setItem(STORAGE_KEYS.questionBank, JSON.stringify(QUESTION_BANK));
  }
}

export function getQuestionBank(): Question[] {
  return readJson<Question[]>(STORAGE_KEYS.questionBank, QUESTION_BANK);
}

export function getActiveQuiz(): ActiveQuiz | null {
  return readJson<ActiveQuiz | null>(STORAGE_KEYS.activeQuiz, null);
}

export function setActiveQuiz(quiz: ActiveQuiz): void {
  writeJson(STORAGE_KEYS.activeQuiz, quiz);
}

export function clearActiveQuiz(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.activeQuiz);
}

export function getQuizHistory(): QuizResult[] {
  return readJson<QuizResult[]>(STORAGE_KEYS.quizHistory, []);
}

export function addQuizResult(result: QuizResult): void {
  const history = getQuizHistory();
  history.push(result);
  writeJson(STORAGE_KEYS.quizHistory, history);
}
