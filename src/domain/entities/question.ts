import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";

// todo: slug é uma frase sem acento sem pontuação que é melhor vista para indexação, o slug tem algumas regras a serem seguidas

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question extends Entity<QuestionProps> {}
