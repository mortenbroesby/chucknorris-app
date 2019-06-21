export enum JokeCategory {
  nerdy = "nerdy",
  explicit = "explicit",
}

export class JokeModel {
  id: string = "";
  joke: string = "";
  categories: JokeCategory[] = [];

  constructor(metadata: any) {
    if (metadata) {
      if (metadata.id) {
        this.id = metadata.id;
      }

      if (metadata.joke) {
        this.joke = metadata.joke;
      }

      if (metadata.categories) {
        // TODO: enum lookup validation.
        this.categories = metadata.categories;
      }
    }
  }
}