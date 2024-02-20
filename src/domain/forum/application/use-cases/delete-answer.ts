import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}
interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  //   toda função assincrona retorna uma promise
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    // .toString porque ele é um uniqueID, o authorId já é passado como string
    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.answerRepository.delete(answer);

    return {};
  }
}
