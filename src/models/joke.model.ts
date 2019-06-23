import { JokeCategory } from "../enums";

export class JokeModel {
  id: string = "";
  message: string = "";
  categories: JokeCategory[] = [];

  constructor(metadata: any) {
    if (metadata) {
      if (metadata.id) {
        this.id = metadata.id;
      }

      if (metadata.joke) {
        this.message = metadata.joke;
      }

      if (metadata.categories) {
        this.categories = metadata.categories;
      }
    }
  }
}
