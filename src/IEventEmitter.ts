import { IEvent } from './IEvent';

export interface IEventEmitter {
    on(event: string, listener: (event: IEvent) => void);
    emit(event: string, ...args: any[]): void;
}
