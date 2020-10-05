import { GameState } from "./App";

export class Game {
  cols: number = 848;
  rows: number = 480;
  public state: GameState = {
    snakes: [],
    food: [],
  };

  applyState = (newState: GameState) => {
    this.state = {
      ...newState,
    };
  };

  getState = () => {
    return this.state;
  };
}
