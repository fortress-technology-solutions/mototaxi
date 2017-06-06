import { ICommand } from './ICommand';
import { ICommandDispatcher } from './ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IEventEmitter } from './IEventEmitter';

export class CommandDispatcher implements ICommandDispatcher {

    private stream: Subject<any>;

    constructor(private commandHandlers: any[], private eventEmitter: IEventEmitter) {
        this.stream = new Subject();
    }

    dispatch(command: ICommand): Observable<any> {
        this.eventEmitter.on(command.type, (cmd) => {
            this.commandHandlers.filter((handler) => handler[cmd.type])
                .map((handler) => handler[cmd.type](cmd))
                .forEach((domainEvent) => this.stream.next(domainEvent));
        });
        setTimeout(() => this.eventEmitter.emit(command.type, command), 0);
        return this.stream;
    }
}
