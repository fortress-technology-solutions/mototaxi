import { ICommand } from './ICommand';
import { IEvent } from '../IEvent';

export interface ICommandHandler {
    type: string;
    handle(command: ICommand): Promise<IEvent>;
}
