import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

// ! nâo criar os setters no começo, somente a medida que for precisando deles

export interface QuestionCommentProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  get authorId() {
    return this.props.authorId;
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

  //faz atualização do updatedAt
  private touch() {
    this.props.updatedAt = new Date();
  }

  //   unica coisa do question-comment que pode ser mudada
  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  static create(
    props: Optional<QuestionCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    // todo -> somente pode ser usado o construtor dentro das classes que instanciam o metodo entity, fora nao sera possivel mais, ai terá que usar o static create
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );

    return questionComment;
  }
}
