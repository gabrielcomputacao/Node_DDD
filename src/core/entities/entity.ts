import { randomUUID } from "node:crypto";
import { UniqueEntityId } from "./unique-entity-id";

export class Entity<Props> {
  // colocando private nao tem como classes externas alterarem o id
  private _id: UniqueEntityId;

  // O protected pode ser acessado pela classe entity e todas que extendem ela, somente
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }
}
