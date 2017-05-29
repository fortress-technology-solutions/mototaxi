import { ICommand } from '../ICommand';
import { IEvent } from '../IEvent';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';

export class ImmediateCommandDispatcher implements ICommandDispatcher {

  constructor(private commandHandlers: any[]) {
  }

  dispatch(command: ICommand): Observable<IEvent> {
    return Rx.Observable.from(this.commandHandlers
        .filter((h) => h[command.type])
        .map((h) => h[command.type](command)));
  }
}
