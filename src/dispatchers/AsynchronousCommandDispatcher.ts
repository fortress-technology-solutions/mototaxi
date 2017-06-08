import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { IEventEmitter } from '../IEventEmitter';
import { ILogger } from '../ILogger';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/throttle';

export class AsynchronousCommandDispatcher implements ICommandDispatcher {

    constructor(private eventEmitter: IEventEmitter, private logger?: ILogger) {
    }

    dispatch(command: ICommand): Observable<any> {
        const receiptId = `${command.type}-${new Date().getTime()}`;

        // Rx.Observable.interval(20)
        //     .throttle(val => Rx.Observable.interval(20))
        //     .first()
        //     .subscribe(() => {
        //         this.eventEmitter.emit(receiptId, command);
        //     });

        setTimeout(() => {
            this.log(`CommandDispatcher: Emitting command: ${receiptId}`);
            this.eventEmitter.emit(receiptId, command);
        }, 50);

        this.log(`CommandDispatcher: Listening for ${receiptId}...`);
        return Rx.Observable.fromEvent((this.eventEmitter as any), receiptId);
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
