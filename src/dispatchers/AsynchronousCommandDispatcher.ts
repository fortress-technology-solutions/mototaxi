import { ICommand } from '../ICommand';
import { ICommandDispatcher } from '../ICommandDispatcher';
import { Observable } from 'rxjs/Observable';
import { IEventEmitter } from '../IEventEmitter';
import { ILogger } from '../ILogger';
import { Subject } from 'rxjs/Subject';
import * as _uuid from 'uuid/v4';

export class AsynchronousCommandDispatcher implements ICommandDispatcher {
  constructor(private eventEmitter: IEventEmitter, private logger?: ILogger) {}

  dispatch(command: ICommand): Observable<any> {
    const uuid = _uuid;
    const transactionId = `${uuid()}-${command.type}`;

    setTimeout(() => {
      this.log(`CommandDispatcher: Emitting command: ${transactionId}`);
      this.eventEmitter.emit(transactionId, command);
    }, 50);

    const subject = new Subject();
    this.log(`CommandDispatcher: Listening for ${transactionId}...`);
    this.eventEmitter.addListener(transactionId, (data: any) => {
      this.log(`CommandDispatcher: Received data for ${transactionId}.`);
      subject.next(data);
    });
    // @ts-ignore
    return subject;
  }

  private log(message): void {
    if (this.logger) {
      this.logger.log(message);
    }
  }
}
