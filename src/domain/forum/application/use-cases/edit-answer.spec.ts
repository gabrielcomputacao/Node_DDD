import { expect, test } from "vitest";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answer-repository";

import { makeAnswer } from "test/factories/make-answer";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// system under test
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    // o case de uso aceito o inMemoty pois ele implementa a classe AnswerRepository, por isso é possivel passar para o caso de uso
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId("author-1"),
      },
      new UniqueEntityId("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "author-1",

      content: "content novo",
    });

    //verifica se essas propriedades estão dentro do objeto passando para ser feito o test
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "content novo",
    });
  });
  it("should not be able to edit a answer from another user", async () => {
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
        answerId: newAnswer.id.toString(),
        authorId: "author-2",

        content: "content novo",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
