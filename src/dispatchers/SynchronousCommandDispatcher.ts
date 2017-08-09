import { ICommand } from "../ICommand";
import { ICommandDispatcher } from "../ICommandDispatcher";
import { Observable } from "rxjs/Observable";
import * as Rx from "rxjs";
import { ILogger } from "../ILogger";
import { IResolver } from "../IResolver";

export class SynchronousCommandDispatcher implements ICommandDispatcher {
  constructor(
    private commandHandlers: any[],
    private resolver: IResolver,
    private logger: ILogger
  ) {}

  dispatch(command: ICommand): Observable<any> {
    return Rx.Observable
      .from(this.commandHandlers)
      .map(handler => {
        return this.resolver.resolve(handler);
      })
      .filter(handler => {
        return handler[command.type];
      })
      .map(handler => {
        this.logger.log(`SyncCommandDispatcher: Handling ${command.type}...`);
        return handler[command.type](command);
      });
  }
}
