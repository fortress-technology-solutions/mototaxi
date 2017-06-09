'use strict';

import { IEventEmitter } from '../IEventEmitter';
import { ISqsConfig } from './ISqsConfig';
import { ILogger } from '../ILogger';
import * as AWS from 'aws-sdk';

export class AwsEventEmitter implements IEventEmitter {
    private sqs: AWS.SQS;

    constructor(private config: ISqsConfig, private logger?: ILogger) {
        this.sqs = new AWS.SQS({region: config.region});
    }

    emit(transactionId: string, payload: any) {
        payload.transactionId = transactionId;
        const outgoingParams = {
            QueueUrl: this.config.outgoingQueueUrl,
            MessageBody: JSON.stringify(payload),
        };
        this.sqs.sendMessage(outgoingParams, (err, sendReceipt) => {
            if (err) {
                this.log(err);
                return;
            }
            this.log(`AwsEventEmitter: message sent to outgoing queue: ${transactionId}`);
        });
    }

    addListener(transactionId: string, action: (domainEvent) => any) {
        const incomingParams = {
            QueueUrl: this.config.incomingQueueUrl,
            MaxNumberOfMessages: 1,
        };

        this.sqs.receiveMessage(incomingParams, (err, data) => {
            if (err) {
                this.log(err);
                return;
            }

            if (data.Messages && data.Messages.length > 0) {
                const body  = JSON.parse(data.Messages[0].Body || '');
                if (body.transactionId === transactionId) {
                    this.log(`AwsEventEmitter: Data received from incoming queue: ${transactionId}`);
                    try {
                        action(body);
                        this.removeFromCommandQueue(data.Messages[0]);
                    } catch (err) {
                        this.log(`AwsEventEmitter: ERROR: ${err}`);
                    }
                }
            }
        });
    }

    removeListener(type: string, listener: any) {
        return;
    }

    private removeFromCommandQueue(message: any) {
        this.sqs.deleteMessage({
            QueueUrl: this.config.incomingQueueUrl,
            ReceiptHandle: message.ReceiptHandle,
        }, (err, data) => {
            if (err) {
                this.log(err);
            }
            this.log(`Consumer: Removed command ${message.Body} from queue.`);
        });
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
