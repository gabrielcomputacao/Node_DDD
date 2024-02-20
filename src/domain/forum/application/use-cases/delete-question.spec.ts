import { expect, test } from "vitest";

import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system under test
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    // o case de uso aceito o inMemoty pois ele implementa a classe QuestionRepository, por isso é possivel passar para o caso de uso
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "question-1",
      authorId: "author-1",
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });
  it("should not be able to delete a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    //   espera que essa função dê erro, pois nao é possivel deletar com id diferente do id do author da pergunta
    expect(async () => {
      return sut.execute({
        questionId: "question-1",
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
