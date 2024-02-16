import { randomUUID } from "node:crypto";

export class Instructor {
  public id: string;
  public name: string;

  // o id nem sempre vai ser instanciado, porque pdoe ser que possamos criar uma instancia para um instrutor ja criado
  constructor(name: string, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
