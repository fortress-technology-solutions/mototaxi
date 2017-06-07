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

    on(commandType: string, action: (command) => any) {
        this.queue.pull(this.config.eventQueueName, (command, done) => {
            if (command && command.type && command.type === commandType) {
                this.log(`AwsEventEmitter: message received: ${command.type}`);
                action(JSON.parse(command));
            }
            done();
        });
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
