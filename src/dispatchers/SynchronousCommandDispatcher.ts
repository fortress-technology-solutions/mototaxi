import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { ILogger } from '../ILogger';

export class SynchronousCommandDispatcher implements ICommandDispatcher {

    constructor(private commandHandlers: any[], private logger?: ILogger) {
    }

    dispatch(command: ICommand): Observable<any> {
        return Rx.Observable.from(this.commandHandlers)
            .filter((handler) => {
                return handler[command.type];
            }).map((handler) => {
                this.log(`SyncCommandDispatcher: Handling ${command.type}...`);
                return handler[command.type](command);
            });
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
