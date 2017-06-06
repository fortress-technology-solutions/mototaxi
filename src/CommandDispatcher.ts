import { ICommand } from './ICommand';
import { ICommandDispatcher } from './ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IEventEmitter } from './IEventEmitter';
import * as Rx from 'rxjs';

export class CommandDispatcher implements ICommandDispatcher {

    private stream: Subject<any>;

    constructor(private commandHandlers: any[], private eventEmitter: IEventEmitter) {
        this.stream = new Subject();

        Rx.Observable.from(this.commandHandlers)
            .map((handler) => {
                return { keys: Object.keys(handler), handler };
            })
            .flatMap(({keys, handler}) => keys.map((commandType) => {
                    return { commandType, handler};
            }))
            .subscribe(({commandType, handler}) => {
                this.eventEmitter.on(commandType, (command) => {
                    const domainEvent = handler[commandType](command);
                    this.stream.next(domainEvent);
                });
            });
    }

    dispatch(command: ICommand): Observable<any> {
        setTimeout(() => this.eventEmitter.emit(command.type, command), 0);
        return this.stream;
    }
}
