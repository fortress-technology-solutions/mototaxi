import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';

export class ImmediateCommandDispatcher implements ICommandDispatcher {

  constructor(private commandHandlers: any[]) {
  }

  dispatch(command: ICommand): Observable<any> {
    return new Observable((observer) => {
        this.commandHandlers.filter((h) => h[command.type])
        .forEach((h) => observer.next(h[command.type](command)));
    });
  }
}
