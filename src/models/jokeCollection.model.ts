import { JokeModel } from "./joke.model";

export class JokeCollectionModel {
  jokes: JokeModel[] = [];

  constructor(metadata?: any) {
    if (metadata) {
      if (metadata.type && metadata.type !== "success") {
        return;
      }

      if (metadata.value) {
        metadata.value.forEach((jokeData: any) => {
          const jokeModel = new JokeModel(jokeData);
          if (jokeModel) {
            this.jokes.push(jokeModel);
          }
        });
      }
    }
  }
}