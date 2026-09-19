import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getActiveQuiz, setActiveQuiz, type ActiveQuiz } from "@/lib/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "QuizCraft — Taking Quiz" },
      { name: "description", content: "Answer 5 random questions in QuizCraft." },
      { property: "og:title", content: "QuizCraft — Taking Quiz" },
      { property: "og:description", content: "Answer 5 random questions in QuizCraft." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate({ from: "/quiz" });
  const [quiz, setQuiz] = useState<ActiveQuiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const active = getActiveQuiz();
    if (!active) {
      return;
    }
    setQuiz(active);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 text-muted-foreground">
        Loading quiz…
      </div>
    );
  }

  if (hydrated && !quiz) {
    return <Navigate to="/" />;
  }

  const currentQuestion = quiz.questions[currentIndex];
  const selectedAnswer = quiz.userAnswers[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleSelect = (optionIndex: number) => {
    const updated: ActiveQuiz = {
      ...quiz,
      userAnswers: [...quiz.userAnswers],
    };
    updated.userAnswers[currentIndex] = optionIndex;
    setQuiz(updated);
    setActiveQuiz(updated);
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((index) => index + 1);
    } else {
      navigate({ to: "/results" });
    }
  };

  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  return (
    <div className="flex min-h-screen flex-col bg-background p-4 py-8 sm:p-6 sm:py-12 lg:p-8">
      <div className="mx-auto w-full max-w-2xl flex-1">
        <Card className="border border-border bg-card text-card-foreground shadow-xl shadow-primary/5">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <CardDescription className="text-sm font-medium">
                Question {currentIndex + 1} of {quiz.questions.length}
              </CardDescription>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {currentQuestion.category}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardTitle
              key={currentIndex}
              className="animate-in fade-in duration-300 text-xl font-semibold leading-snug text-foreground sm:text-2xl"
            >
              {currentQuestion.questionText}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              key={currentIndex}
              className="animate-in fade-in duration-300 grid grid-cols-1 gap-3"
              role="radiogroup"
              aria-label="Answer options"
            >
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                return (
                  <button
                    key={optionIndex}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelect(optionIndex)}
                    className={cn(
                      "rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/10"
                        : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="rounded-xl px-8 py-5 text-base font-semibold shadow-lg shadow-primary/15 transition-transform active:scale-[0.98]"
              >
                {isLastQuestion ? "Finish Quiz" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
