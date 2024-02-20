import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}
interface EditQuestionUseCaseResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  //   toda função assincrona retorna uma promise
  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    // .toString porque ele é um uniqueID, o authorId já é passado como string
    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    // só é possivel editar essa propriedade porque foi criado um set dentro da classe question
    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return {
      question,
    };
  }
}
