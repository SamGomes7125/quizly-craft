import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateRandomQuiz, getQuestionBank, seedQuestionBank, setActiveQuiz } from "@/lib/quiz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuizCraft — Test Your Knowledge" },
      {
        name: "description",
        content: "Take a random 5-question quiz from our 25-question bank and see how you score.",
      },
      { property: "og:title", content: "QuizCraft — Test Your Knowledge" },
      {
        property: "og:description",
        content: "Take a random 5-question quiz from our 25-question bank and see how you score.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate({ from: "/" });
  const [questionCount, setQuestionCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    seedQuestionBank();
    const bank = getQuestionBank();
    setQuestionCount(bank.length);
    setIsReady(true);
  }, []);

  const handleStartQuiz = () => {
    const bank = getQuestionBank();
    const quiz = generateRandomQuiz(bank, 5);
    setActiveQuiz(quiz);
    navigate({ to: "/quiz" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-lg border border-border bg-card text-card-foreground shadow-xl shadow-primary/5">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            QuizCraft
          </CardTitle>
          <CardDescription className="mt-3 text-base text-muted-foreground sm:text-lg">
            Test your knowledge with 5 random questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 text-center">
          <div className="rounded-2xl bg-muted/50 px-4 py-6">
            <p className="text-sm font-medium text-muted-foreground">
              {isReady ? `${questionCount} questions in the bank` : "Loading question bank…"}
            </p>
          </div>
          <Button
            size="lg"
            className="w-full rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
            onClick={handleStartQuiz}
            disabled={!isReady}
          >
            Start New Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
