import { ICommand } from '../ICommand';
import { IQueuePusher } from '../IQueuePusher';
import { IEventListener } from '../IEventListener';
import { ConfigurableCommandDispatcher } from '../dispatchers/ConfigurableCommandDispatcher';

export class AsyncCommandDispatcher extends ConfigurableCommandDispatcher {

  constructor(queuePusher: IQueuePusher, eventListener: IEventListener) {
    const handle = (command: ICommand) => {
      return queuePusher.push(command);
    };
    const listen = (command: ICommand) => {
      return eventListener.listenFor(command);
    };
    super(handle, listen);
  }
}
