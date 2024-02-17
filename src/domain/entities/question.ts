import { randomUUID } from "node:crypto";
import { Slug } from "./value-objects/slug";

// todo: slug é uma frase sem acento sem pontuação que é melhor vista para indexação, o slug tem algumas regras a serem seguidas

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question {
  public id: string;
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
    this.slug = props.slug;
    this.id = id ?? randomUUID();
  }
}
