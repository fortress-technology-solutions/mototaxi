import { IEvent } from './IEvent';
import { ISubject } from './ISubject';
import { IEventEmitter } from './IEventEmitter';

export class Subject implements ISubject {
    constructor(private eventEmitter: IEventEmitter) {
    }

    subscribe(type: string, action: (event: IEvent) => void) {
        this.eventEmitter.on(type, action);
        return this;
    }
}
