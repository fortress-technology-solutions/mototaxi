import { ICommand } from './ICommand';
import { Observable } from 'rxjs/Observable';

export interface IEventListener {
  listenFor(command: ICommand): Observable<any>;
}
