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
        this.queue.push(this.config.commandQueueName, payload, () => {
            this.log(`AwsEventEmitter: message sent: ${commandType}`);
        });
    }

    addListener(eventType: string, action: (domainEvent) => any) {
        this.queue.pull(this.config.eventQueueName, (domainEvent, done) => {
            this.log(`AwsEventEmitter: domain event received: ${JSON.stringify(domainEvent)}.`);
            action(domainEvent);
            done();
        });
    }

    removeListener(type: string, listener: any) {
        return;
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
