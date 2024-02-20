import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from "@faker-js/faker";

// todo: O partial faz com que todas as propriedades se tornem opcionais, entao o override vai receber qualquer informação do question Props

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId
) {
  const newQuestion = Question.create(
    {
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return newQuestion;
}
