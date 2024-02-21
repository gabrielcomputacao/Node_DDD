import { expect, test } from "vitest";

import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository";

import { makeQuestion } from "test/factories/make-question";

import { FetchRecentQuestionsUseCase } from "./fetch-recent-topics";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answer-repository";
import { FetchQuestionsAnswersUseCase } from "./fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
// system under test
let sut: FetchQuestionsAnswersUseCase;

describe("Create Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    // o case de uso aceito o inMemoty pois ele implementa a classe QuestionRepository, por isso é possivel passar para o caso de uso
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository);
  });

  test("should be to fetch questions answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("question-1"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("question-1"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("question-1"),
      })
    );

    const { answers } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  //   test.skip pula o test na hora de rodar
  test("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId("question-1"),
        })
      );
    }

    const { answers } = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
