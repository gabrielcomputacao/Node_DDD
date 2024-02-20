import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface DeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}
interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  //   toda função assincrona retorna uma promise
  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    // .toString porque ele é um uniqueID, o authorId já é passado como string
    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    await this.questionRepository.delete(question);

    return {};
  }
}
