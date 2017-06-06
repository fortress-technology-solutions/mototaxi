import { ICommand } from './ICommand';
import { ICommandDispatcher } from './ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IEventEmitter } from './IEventEmitter';
import { ILogger } from './ILogger';

export class CommandDispatcher implements ICommandDispatcher {

    private stream: Subject<any>;

    constructor(private commandHandlers: any[], private eventEmitter: IEventEmitter, private logger?: ILogger) {
        this.stream = new Subject();
    }

    dispatch(command: ICommand): Observable<any> {
        this.log(`CommandDispatcher: Listening for ${command.type}...`);
        this.eventEmitter.on(command.type, (cmd) => {
            this.commandHandlers.filter((handler) => {
                return handler[cmd.type];
            }).map((handler) => {
                this.log(`CommandDispatcher: Handling ${cmd.type}...`);
                return handler[cmd.type](cmd);
            }).forEach((domainEvent) => {
                this.log(`CommandDispatcher: Raising domain event:` + JSON.stringify(domainEvent));
                this.stream.next(domainEvent);
            });
        });
        setTimeout(() => {
            this.log(`CommandDispatcher: Emitting command: ${command.type}`);
            this.eventEmitter.emit(command.type, command);
        }, 0);
        return this.stream;
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
