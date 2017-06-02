import { ICommand } from '../ICommand';
import { ISnsConfig } from './ISnsConfig';
import { IEventListener } from '../IEventListener';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { SNS } from 'aws-sdk';

export class SnsEventListener implements IEventListener {
    constructor(private snsConfig: ISnsConfig) {
    }

    listenFor(command: ICommand): Observable<any> {
        return Rx.Observable.fromPromise(new Promise((resolve, reject) => {
            const sns = new SNS();
            sns.subscribe({
                TopicArn: this.snsConfig.topicArn,
                Protocol: 'sqs',
                Endpoint: this.snsConfig.queueArn,
            }, (err, result) => {

                if (err !== null) {
                    reject(err);
                }

                resolve(result);
            });
        }));
    }
}
