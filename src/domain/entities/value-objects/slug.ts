export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Receives a string and normalize it as a slug
   *
   * Example: " An example title" => "an-example-title"
   *
   * @param text {string}
   *
   */

  static createFromText(text: string) {
    // Normalize: padroniza a stirng removendo ou convertendo um caracter para um caracter aceito dentro da convenção que esta dentro da fução
    // remove toda acentuação e devolve sem acentos
    const slugText = text
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");

    return new Slug(slugText);
  }
}
