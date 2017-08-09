import { ICommand } from './ICommand';
import { Observable } from 'rxjs/Observable';

export interface IQueuePusher {
  push(command: ICommand): Observable<any>;
}
