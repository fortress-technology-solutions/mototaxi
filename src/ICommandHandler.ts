import { ICommand } from './ICommand';

export interface ICommandHandler {
    type: string;
    handle(command: ICommand): Promise<any>;
}
