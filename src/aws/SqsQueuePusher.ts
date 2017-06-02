import { ICommand } from '../ICommand';
import { ISqsConfig } from './ISqsConfig';
import { IQueuePusher } from '../IQueuePusher';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import * as sqs from 'sqs';

export class SqsQueuePusher implements IQueuePusher {
    constructor(private sqsConfig: ISqsConfig) {
    }

    push(command: ICommand): Observable<any> {
        const queue = sqs(this.sqsConfig);
        return Rx.Observable.fromPromise(new Promise((resolve, reject) => {
            queue.push(this.sqsConfig.name, command, (complete) => {
                resolve(complete);
            });
        }));
    }
}
