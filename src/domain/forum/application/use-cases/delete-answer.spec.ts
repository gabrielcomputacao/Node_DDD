import { expect, test } from "vitest";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answer-repository";

import { makeAnswer } from "test/factories/make-answer";
import { DeleteAnswerUseCase } from "./delete-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// system under test
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    // o case de uso aceito o inMemoty pois ele implementa a classe AnswerRepository, por isso é possivel passar para o caso de uso
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });
  it("should not be able to delete a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    //   espera que essa função dê erro, pois nao é possivel deletar com id diferente do id do author da pergunta
    expect(async () => {
      return sut.execute({
        answerId: "answer-1",
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
