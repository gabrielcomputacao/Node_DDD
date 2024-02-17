import { randomUUID } from "crypto";

// é um value object que será disponibilizado para todas as classes do sistema, todo lugar que for preciso gerar ou referenciar o id é possivel atraves dessa classe
export class UniqueEntityId {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }
}
