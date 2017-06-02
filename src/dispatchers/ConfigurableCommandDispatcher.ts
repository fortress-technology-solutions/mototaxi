import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';

export class ConfigurableCommandDispatcher implements ICommandDispatcher {

  constructor(
    private handleCommand: (command: ICommand) => Observable<any>,
    private getResponses: (command: ICommand) => Observable<any>) {
  }

  dispatch(command: ICommand): Observable<any> {
      const handleStream = this.handleCommand(command);
      const eventStream = this.getResponses(command);
      return handleStream.merge(eventStream);
  }
}
