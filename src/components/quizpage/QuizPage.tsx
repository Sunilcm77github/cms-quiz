import React, { useState } from "react";
import "./QuizPage.css";
import {
  Difficulty,
  fetchQuizQuestions,
  QuestionState,
} from "../../QuizService";
import QuestionCard from "../questioncard/QuestionCard";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 20;

const QuizPage = () => {
  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [numbers, setNumbers] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumbers(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[numbers].correct_answer === answer;

      if (correct) {
        setScore((prev) => prev + 1);
      }
      const AnswerObject = {
        question: questions[numbers].question,
        answer,
        correct,
        correctAnswer: questions[numbers].correct_answer,
      };
      setUserAnswers((prev) => [...prev, AnswerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = numbers + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumbers(nextQuestion);
    }
  };

  // const previousQuestion = () => {
  //   const prev = numbers - 1;
  //   if (prev >= 0) {
  //     setNumbers(prev);
  //   }
  // };

  console.log(questions);

  return (
    <div className="quiz">
      <h2>Quiz Game</h2>
      {!Loading && gameOver ? (
        <p className="welcome">Wecome To Quiz Game </p>
      ) : null}
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="scroe">Score: {score}</p> : null}
      {Loading ? <p className="loading">Loading Questions...</p> : null}

      {!Loading && !gameOver && (
        <QuestionCard
          questionNumber={numbers + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[numbers]?.question}
          answers={questions[numbers].answers}
          userAnswer={userAnswers ? userAnswers[numbers] : undefined}
          callback={checkAnswer}
        />
      )}

      <div className="actions">
        {/* {!gameOver && !Loading && (
          <button
            className="previous"
            disabled={numbers === 0}
            onClick={previousQuestion}
          >
            Previous
          </button>
        )} */}
        {!gameOver && !Loading && (
          <button
            className="next"
            disabled={
              numbers === TOTAL_QUESTIONS - 1 ||
              userAnswers.length !== numbers + 1
            }
            onClick={nextQuestion}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
