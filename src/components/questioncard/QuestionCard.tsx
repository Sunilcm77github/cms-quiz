import React from "react";
import "./QuestionCard.css";
import { AnswerObject } from "../quizpage/QuizPage";

type QuestionProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="QuestionCard">
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answers">
        {answers.map((answer) => (
          <button
            key={answer}
            disabled={!!userAnswer}
            value={answer}
            onClick={callback}
            className={
              userAnswer
                ? answer === userAnswer.correctAnswer
                  ? "correct"
                  : answer === userAnswer.answer
                  ? "incorrect"
                  : ""
                : ""
            }
          >
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
