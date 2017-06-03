import { ICommand } from './ICommand';
import { ICommandDispatcher } from './ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as EventEmitter from 'events';

export class CommandDispatcher implements ICommandDispatcher {

    private stream: Subject<any>;
    private eventEmitter: EventEmitter;

    constructor(private commandHandlers: any[]) {
        this.stream = new Subject();
        this.eventEmitter = new EventEmitter();

        this.commandHandlers
            .forEach((handler) => {
                Object.keys(handler).forEach((commandType) => {
                    this.eventEmitter.on(commandType, (command) => {
                        const domainEvent = handler[commandType](command);
                        this.stream.next(domainEvent);
                    });
                });
            });
    }

    dispatch(command: ICommand): Observable<any> {
        setTimeout(() => this.eventEmitter.emit(command.type, command), 0);
        return this.stream;
    }
}
