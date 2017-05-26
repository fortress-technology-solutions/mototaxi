import { ICommand } from './ICommand';
import { IEvent } from './IEvent';
import { ICommandHandler } from './ICommandHandler';
import { ICommandDispatcher } from './ICommandDispatcher';
import { Observable } from 'rxjs/Rx';

export class CommandDispatcher implements ICommandDispatcher {

  constructor(private commandHandlers: ICommandHandler[]) {
  }

  dispatch(command: ICommand): Observable<IEvent> {
    const obs = new Observable((observer) => {
      this.commandHandlers
        .filter((h) => h.type === command.type)
        .forEach((h) => {
          observer.next(h.handle(command));
        });
    });
    obs.subscribe();
    return obs;
  }
}
