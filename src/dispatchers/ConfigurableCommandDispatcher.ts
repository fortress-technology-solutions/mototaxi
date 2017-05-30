import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';

export class ConfigurableCommandDispatcher implements ICommandDispatcher {

  constructor(
    private validateCommand: (command: ICommand) => Observable<any>,
    private handleCommand: (command: ICommand) => Observable<any>,
    private getResponses: (command: ICommand) => Observable<any>) {
  }

  dispatch(command: ICommand): Observable<any> {
      this.validateCommand(command);
      this.handleCommand(command);
      return this.getResponses(command);
  }
}
