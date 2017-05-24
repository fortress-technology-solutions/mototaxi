import { IEvent } from './IEvent';

export interface ISubject {
    subscribe(type: string, action: (event: IEvent) => void);
}
