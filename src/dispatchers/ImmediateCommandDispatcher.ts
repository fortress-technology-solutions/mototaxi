import { ICommand } from '../ICommand';
import { ConfigurableCommandDispatcher } from '../dispatchers/ConfigurableCommandDispatcher';
import * as Rx from 'rxjs';

export class ImmediateCommandDispatcher extends ConfigurableCommandDispatcher {

  constructor(commandHandlers: any[]) {
    const handle = (command: ICommand) => {
      return Rx.Observable.from([]);
    };
    const listen = (command: ICommand) => {
      return Rx.Observable.from(commandHandlers
        .filter((h) => h[command.type])
        .map((h) => h[command.type](command)));
    };
    super(handle, listen);
  }
}
