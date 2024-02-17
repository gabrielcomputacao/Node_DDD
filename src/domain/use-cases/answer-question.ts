import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    // como nao foi passado o id para a resposta ele mesma cria seu id
    const answer = new Answer({
      authorId: instructorId,
      content,
      questionId,
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}

/* 

todo: Exemplo de chamada de função da classe answerQuestionUseCase
todo: new AnswerQuestionUseCase().execute({ instructorId: "1", questionId: "2" }); 

*/
