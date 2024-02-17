import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQUestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQUestion.execute({
    content: "nova resposta",
    instructorId: "1",
    questionId: "2",
  });

  expect(answer.content).toEqual("nova resposta");
});
