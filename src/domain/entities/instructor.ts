import { Entity } from "../../core/entities/entity";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  // o id nem sempre vai ser instanciado, porque pdoe ser que possamos criar uma instancia para um instrutor ja criado
}
