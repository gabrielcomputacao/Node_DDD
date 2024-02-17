import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    // como nao foi passado o id para a resposta ele mesma cria seu id
    const answer = new Answer({
      authorId: instructorId,
      content,
      questionId,
    });

    return answer;
  }
}

/* 

todo: Exemplo de chamada de função da classe answerQuestionUseCase
todo: new AnswerQuestionUseCase().execute({ instructorId: "1", questionId: "2" }); 

*/
