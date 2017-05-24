import { ICommandHandler } from './ICommandHandler';
import { IEventEmitter } from './IEventEmitter';

export interface IMotoTaxiConfig {
    commandHandlers?: ICommandHandler[];
    commandEmitter?: IEventEmitter;
    domainEventEmitter?: IEventEmitter;
}
