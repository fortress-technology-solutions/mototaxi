import { ICommand } from './ICommand';
import { Observable } from 'rxjs/Observable';

export interface ICommandDispatcher {
    dispatch(command: ICommand): Observable<any>;
}
