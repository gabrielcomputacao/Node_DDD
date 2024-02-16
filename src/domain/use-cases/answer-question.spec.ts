import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQUestion = new AnswerQuestionUseCase();

  const answer = answerQUestion.execute({
    content: "nova resposta",
    instructorId: "1",
    questionId: "2",
  });

  expect(answer.content).toEqual("nova resposta");
});
