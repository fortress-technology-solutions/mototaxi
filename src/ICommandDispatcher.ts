import { ICommand } from './ICommand';
import { ISubject } from './ISubject';

export interface ICommandDispatcher {
    dispatch(command: ICommand): ISubject;
}
