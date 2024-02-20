import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }
  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    // o splice deleta itens a partir do indice passado, e nesse caso so foi 1 item deletado a partir do index passado, conta desde o primeiro indice passado
    this.items.splice(itemIndex, 1);
  }
  public items: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    // o splice deleta itens a partir do indice passado, e nesse caso so foi 1 item deletado a partir do index passado, conta desde o primeiro indice passado
    this.items[itemIndex] = answer;
  }
}
