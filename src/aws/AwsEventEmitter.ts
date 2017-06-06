'use strict';

import { IEventEmitter } from '../IEventEmitter';
import { ISqsConfig } from './ISqsConfig';
import * as _sqs from 'sqs';
import { ILogger } from '../ILogger';

export class AwsEventEmitter implements IEventEmitter {
    private queue: any;

    constructor(private config: ISqsConfig, private logger?: ILogger) {
        const sqs =  _sqs;
        this.queue = sqs(config);
    }

    emit(commandType: string, payload: any) {
        this.queue.push(this.config.commandQueueName, payload, (complete) => {
            this.log(`AwsEventEmitter: message sent: ${complete}`);
        });
    }

    on(commandType: string, action: (command) => any) {
        this.queue.pull(this.config.eventQueueName, (message, done) => {
            this.log(`AwsEventEmitter: message received: ${message}`);
            action(JSON.parse(message));
            done();
        });
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
