import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  delete(question: Answer): Promise<void>;
  save(question: Answer): Promise<void>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>;
}
