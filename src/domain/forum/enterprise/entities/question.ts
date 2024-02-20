import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

// todo: slug é uma frase sem acento sem pontuação que é melhor vista para indexação, o slug tem algumas regras a serem seguidas

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;

  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }
  get bestAnswerId() {
    return this.props.bestAnswerId;
  }
  get title() {
    return this.props.title;
  }
  get slug() {
    return this.props.slug;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get content() {
    return this.props.content;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, "days") <= 3;
  }

  get excerpt() {
    // substring pega de 0 a 120 palavras , com o trimend tira o espaço no final, e junta com o concat os ... no final, é como se fosse um resumo
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    // quando title for atualizado , vem e atualiza o slug junto
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }
  set content(content: string) {
    this.props.content = content;
    this.touch();
  }
  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  // metodo static é aquele metodo que nao precisa instanciar a classe para chamar o metodo
  // todo -> o metodo create vai agir como se fosse um construtor da classe mas sem substituir o construtor da classe pai(que foi extendida)

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityId
  ) {
    // todo -> somente pode ser usado o construtor dentro das classes que instanciam o metodo entity, fora nao sera possivel mais, ai terá que usar o static create
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}
