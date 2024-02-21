import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository {
  // por causa do contrato devolvedor uma promise precisa ser async o metodo

  public items: Question[] = [];

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    // o splice deleta itens a partir do indice passado, e nesse caso so foi 1 item deletado a partir do index passado, conta desde o primeiro indice passado
    this.items.splice(itemIndex, 1);
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    // o splice deleta itens a partir do indice passado, e nesse caso so foi 1 item deletado a partir do index passado, conta desde o primeiro indice passado
    this.items[itemIndex] = question;
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    //  .getTime = numero de segundos desde 1970 quando começou a contar times temp

    //  todo => vai comparar qual times temp é menor e assim organizar pelo sort do javascript
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      // page = 0 -1 * 20 == 0, 0 * 20 = 0
      //page -1 * 20 é de onde ele vai começar a pegar os dados no array, e page * 20 até qual dado ele vai puxar
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
