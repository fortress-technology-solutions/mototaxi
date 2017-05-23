import { ICommand } from '../ICommand';
import { ICommandHandler } from '../ICommandHandler';
import { ICommandDispatcher } from '../ICommandDispatcher';

export default class SynchronousCommandDispatcher implements ICommandDispatcher {

  constructor(private commandHandlers: ICommandHandler[]) {
  }

  dispatch(command: ICommand): Promise<void> {
    const matchingHandlers = this.commandHandlers
      .filter((h) => {
        return h.type === command.type;
      });

    return matchingHandlers.map(h => {
        return h.handle(command);
      });
  }
}
