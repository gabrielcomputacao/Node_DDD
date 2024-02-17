import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";

// todo: slug é uma frase sem acento sem pontuação que é melhor vista para indexação, o slug tem algumas regras a serem seguidas

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;

  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  // metodo static é aquele metodo que nao precisa instanciar a classe para chamar o metodo
  // todo -> o metodo create vai agir como se fosse um construtor da classe mas sem substituir o construtor da classe pai(que foi extendida)

  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    // todo -> somente pode ser usado o construtor dentro das classes que instanciam o metodo entity, fora nao sera possivel mais, ai terá que usar o static create
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}
