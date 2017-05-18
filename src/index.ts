import { getCommandHandlers } from './command-handlers';

export async function dispatch(command: ICommand) {
  const handlers = getCommandHandlers();
  console.log(handlers.length);
  return handlers
    .filter((h) => {
      return h.type === command.type;
    }).map(h => {
      return h.handle(command);
    });
}