import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { IEventEmitter } from '../IEventEmitter';
import { ILogger } from '../ILogger';
import * as Rx from 'rxjs';

export class AsynchronousCommandDispatcher implements ICommandDispatcher {

    constructor(private eventEmitter: IEventEmitter, private logger?: ILogger) {
    }

    dispatch(command: ICommand): Observable<any> {
        const receiptId = `${command.type}-${new Date().getTime()}`;
        this.log(`CommandDispatcher: Listening for ${receiptId}...`);
        const source = Rx.Observable.fromEvent((this.eventEmitter as any), receiptId);
        this.log(`CommandDispatcher: Emitting command: ${receiptId}`);
        setTimeout(() => {
            this.eventEmitter.emit(receiptId, command);
        }, 50);
        return source;
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
