import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  // o id nem sempre vai ser instanciado, porque pdoe ser que possamos criar uma instancia para um instrutor ja criado

  static create(props: InstructorProps, id?: UniqueEntityId) {
    // todo -> somente pode ser usado o construtor dentro das classes que instanciam o metodo entity, fora nao sera possivel mais, ai terá que usar o static create
    const instructor = new Instructor(props, id);

    return instructor;
  }
}
