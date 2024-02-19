import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { QuestionRepository } from "../repositories/question-repository";
import { Question } from "../../enterprise/entities/question";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {
    return;
  },
};

test("create a question", async () => {
  const createQUestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const { question } = await createQUestion.execute({
    content: "conteudo da pergunta",
    title: "teste pergunta",
    authorId: "1",
  });

  expect(question.id).toBeTruthy();
});
