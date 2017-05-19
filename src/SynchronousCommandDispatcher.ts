import { ICommand } from './ICommand';
import { ICommandHandler } from './ICommandHandler';
import { ICommandDispatcher } from './ICommandDispatcher';

export class SynchronousCommandDispatcher implements ICommandDispatcher {

  constructor(private commandHandlers: ICommandHandler[]) {
  }

  async dispatch(command: ICommand): Promise<any> {
    return this.commandHandlers
      .filter((h) => {
        return h.type === command.type;
      }).forEach(h => {
        h.handle(command);
      });
  }
}
