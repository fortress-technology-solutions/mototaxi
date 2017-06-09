import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { IEventEmitter } from '../IEventEmitter';
import { ILogger } from '../ILogger';
import { Subject } from 'rxjs/Subject';
import * as uuid from 'uuid/v4';

export class AsynchronousCommandDispatcher implements ICommandDispatcher {

    constructor(private eventEmitter: IEventEmitter, private logger?: ILogger) {
    }

    dispatch(command: ICommand): Observable<any> {
        const receiptId = `${uuid()}-${command.type}`;

        setTimeout(() => {
            this.log(`CommandDispatcher: Emitting command: ${receiptId}`);
            this.eventEmitter.emit(receiptId, command);
        }, 50);

        const subject = new Subject();
        this.log(`CommandDispatcher: Listening for ${receiptId}...`);
        this.eventEmitter.addListener(receiptId, (data: any) => {
            this.log(`CommandDispatcher: Received data for ${receiptId}.`);
            subject.next(data);
        });
        return subject;
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
