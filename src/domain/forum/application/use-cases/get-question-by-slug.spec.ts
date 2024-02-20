import { expect, test } from "vitest";

import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system under test
let sut: GetQuestionBySlugUseCase;

describe("Create Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    // o case de uso aceito o inMemoty pois ele implementa a classe QuestionRepository, por isso é possivel passar para o caso de uso
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  test("should be able to get a question by slug", async () => {
    // pergunta foi criada
    const newQuestion = makeQuestion({
      slug: Slug.create("example-question"),
    });
    // salva no repositorio

    await inMemoryQuestionsRepository.create(newQuestion);

    // depois busca se existe o slug referente

    const { question } = await sut.execute({
      slug: "example-question",
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
