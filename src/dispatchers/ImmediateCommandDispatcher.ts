import { ICommand } from '../ICommand';
import { IEvent } from '../IEvent';
import { ICommandHandler } from '../ICommandHandler';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';

export class ImmediateCommandDispatcher implements ICommandDispatcher {

  constructor(private commandHandlers: ICommandHandler[]) {
  }

  dispatch(command: ICommand): Observable<IEvent> {
    const domainEvents = this.commandHandlers
        .filter((h) => h.type === command.type)
        .map((h) => h.handle(command));
    const obs = Rx.Observable.from(domainEvents);
    return obs;
  }
}
