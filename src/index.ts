import { getCommandHandlers } from './command-handlers';

export async function dispatch(command: ICommand) {
  return getCommandHandlers()
    .filter((h) => {
      return h.type === command.type;
    }).map(h => {
      return h.handle(command);
    });
}