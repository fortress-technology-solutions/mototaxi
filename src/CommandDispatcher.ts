import { ICommand } from './ICommand';
import { ICommandDispatcher } from './ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IEventEmitter } from './IEventEmitter';

export class CommandDispatcher implements ICommandDispatcher {

    private stream: Subject<any>;

    constructor(private commandHandlers: any[], private eventEmitter: IEventEmitter) {
        this.stream = new Subject();

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
