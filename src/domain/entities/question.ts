import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

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

export class Question extends Entity<QuestionProps> {}
