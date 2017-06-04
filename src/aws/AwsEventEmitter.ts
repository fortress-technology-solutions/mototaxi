import { IEventEmitter } from '../IEventEmitter';
import { ISqsConfig } from './ISqsConfig';
import * as sqs from 'sqs';

export class AwsEventEmitter implements IEventEmitter {
    private queue: any;

    constructor(private config: ISqsConfig, private log?: (msg) => void) {
        this.queue = sqs(config);
    }

    emit(commandType: string, payload: any) {
        this.queue.push(this.config.commandQueueName, payload, (complete) => {
            if (this.log) {
                this.log(`message sent: ${complete}`);
            }
        });
    }

    on(commandType: string, action: (command) => any) {
        this.queue.pull(this.config.eventQueueName, (message, done) => {
            if (this.log) {
                this.log(`message received: ${message}`);
            }
            action(message);
            done();
        });
    }
}
