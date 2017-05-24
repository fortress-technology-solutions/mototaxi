import { ICommand } from './ICommand';
import { ICommandHandler } from './ICommandHandler';
import { ICommandDispatcher } from './ICommandDispatcher';
import { ISubject } from './ISubject';
import { Subject } from './Subject';
import { IEventEmitter } from './IEventEmitter';

export class CommandDispatcher implements ICommandDispatcher {

  constructor(handlers: ICommandHandler[],
              private commandEmitter: IEventEmitter,
              private domainEventEmitter: IEventEmitter) {
    this.registerHandlersWithCommandEmitter(handlers, commandEmitter);
  }

  dispatch(command: ICommand): ISubject {
    this.commandEmitter.emit(command.type, command);
    return new Subject(this.domainEventEmitter);
  }

  private registerHandlersWithCommandEmitter = (handlers, commandEmitter) => {
    handlers.forEach((handler) => {
      commandEmitter.on(handler.type, (command) => {
        const domainEvent = handler.handle(command);
        this.domainEventEmitter.emit(domainEvent.type, domainEvent);
      });
    });
  }
}
