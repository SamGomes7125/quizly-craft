import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  addQuizResult,
  calculateScore,
  generateRandomQuiz,
  getActiveQuiz,
  getQuestionBank,
  setActiveQuiz,
  type ActiveQuiz,
  type CategoryBreakdown,
} from "@/lib/quiz";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "QuizCraft — Results" },
      { name: "description", content: "Review your QuizCraft score and answers." },
      { property: "og:title", content: "QuizCraft — Results" },
      { property: "og:description", content: "Review your QuizCraft score and answers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const navigate = useNavigate({ from: "/results" });
  const [quiz, setQuiz] = useState<ActiveQuiz | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const active = getActiveQuiz();
    if (!active) {
      return;
    }
    setQuiz(active);

    const score = calculateScore(active);
    const percentage = Math.round((score / active.questions.length) * 100);
    const categoryBreakdown = buildCategoryBreakdown(active);

    addQuizResult({
      score,
      total: active.questions.length,
      percentage,
      categoryBreakdown,
      completedAt: new Date().toISOString(),
    });
  }, []);

  const { score, percentage, categoryBreakdown } = useMemo(() => {
    if (!quiz) {
      return { score: 0, percentage: 0, categoryBreakdown: {} as CategoryBreakdown };
    }
    const score = calculateScore(quiz);
    return {
      score,
      percentage: Math.round((score / quiz.questions.length) * 100),
      categoryBreakdown: buildCategoryBreakdown(quiz),
    };
  }, [quiz]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-muted-foreground">
        Loading results…
      </div>
    );
  }

  if (!quiz) {
    return <Navigate to="/" />;
  }

  const handleTryAnother = () => {
    const bank = getQuestionBank();
    const newQuiz = generateRandomQuiz(bank, 5);
    setActiveQuiz(newQuiz);
    setQuiz(newQuiz);
    navigate({ to: "/quiz" });
  };

  return (
    <div className="min-h-screen bg-background p-4 py-8 sm:p-6 sm:py-12 lg:p-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Card className="border border-border bg-card text-card-foreground shadow-xl shadow-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Results
            </CardTitle>
            <CardDescription className="mt-2 text-2xl font-semibold text-primary sm:text-3xl">
              {score}/{quiz.questions.length} — {percentage}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {Object.entries(categoryBreakdown).map(([category, { correct, total }]) => (
                <div
                  key={category}
                  className="flex items-center justify-between rounded-xl bg-muted px-4 py-3"
                >
                  <span className="text-sm font-medium text-muted-foreground">{category}</span>
                  <span className="text-base font-semibold text-foreground">
                    {correct}/{total}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Review</h2>
          {quiz.questions.map((question, index) => {
            const userAnswerIndex = quiz.userAnswers[index];
            const isCorrect = userAnswerIndex === question.correctAnswerIndex;
            const userAnswerText =
              userAnswerIndex != null ? question.options[userAnswerIndex] : "No answer";

            return (
              <Card
                key={question.id}
                className={cn(
                  "border border-border bg-card text-card-foreground shadow-sm",
                  "border-l-4",
                  isCorrect ? "border-l-success" : "border-l-destructive",
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {index + 1}. {question.questionText}
                    </CardTitle>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-bold",
                        isCorrect
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  <CardDescription>{question.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 text-sm sm:text-base">
                  <p>
                    <span className="text-muted-foreground">Your answer:</span>{" "}
                    <span className={cn("font-medium", isCorrect ? "text-success" : "text-destructive")}>
                      {userAnswerText}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      <span className="text-muted-foreground">Correct answer:</span>{" "}
                      <span className="font-medium text-success">
                        {question.options[question.correctAnswerIndex]}
                      </span>
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            onClick={handleTryAnother}
            className="flex-1 rounded-xl py-5 text-base font-semibold shadow-lg shadow-primary/15 transition-transform active:scale-[0.98]"
          >
            Try Another Random Quiz
          </Button>
          <Button
            variant="secondary"
            asChild
            className="flex-1 rounded-xl py-5 text-base font-semibold transition-transform active:scale-[0.98]"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function buildCategoryBreakdown(activeQuiz: ActiveQuiz): CategoryBreakdown {
  return activeQuiz.questions.reduce<CategoryBreakdown>((acc, question, index) => {
    const existing = acc[question.category] ?? { correct: 0, total: 0 };
    existing.total += 1;
    if (activeQuiz.userAnswers[index] === question.correctAnswerIndex) {
      existing.correct += 1;
    }
    acc[question.category] = existing;
    return acc;
  }, {});
}
