import { expect, test } from "vitest";

import { InMemoryQuestionsRepository } from "test/repositories/in-memory-question-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";

import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answer-repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
// system under test
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    // o case de uso aceito o inMemoty pois ele implementa a classe QuestionRepository, por isso é possivel passar para o caso de uso
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionsRepository
    );
  });

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id
    );
  });
  it("should not be able to choose another user best answer", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    //   espera que essa função dê erro, pois nao é possivel deletar com id diferente do id do author da pergunta
    expect(async () => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
