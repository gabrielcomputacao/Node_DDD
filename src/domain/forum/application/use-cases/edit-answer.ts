import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}
interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  //   toda função assincrona retorna uma promise
  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    // .toString porque ele é um uniqueID, o authorId já é passado como string
    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    // só é possivel editar essa propriedade porque foi criado um set dentro da classe answer

    answer.content = content;

    await this.answerRepository.save(answer);

    return {
      answer,
    };
  }
}
