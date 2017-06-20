'use strict';

import { IEventEmitter } from '../IEventEmitter';
import { ISqsConfig } from './ISqsConfig';
import { ILogger } from '../ILogger';
import * as AWS from 'aws-sdk';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export class AwsEventEmitter implements IEventEmitter {
    private listeners: any = {};
    private polling: boolean = false;

    constructor(private sqs: AWS.SQS, private config: ISqsConfig, private logger?: ILogger) {
    }

    emit(transactionId: string, payload: any) {
        const outgoingParams = {
            QueueUrl: this.config.commandQueueUrl,
            MessageBody: JSON.stringify({
                transactionId,
                payload,
            }),
        };
        this.sqs.sendMessage(outgoingParams, (err, sendReceipt) => {
            if (err) {
                this.log(err);
                return;
            }
            this.log(`AwsEventEmitter: message sent to command queue: ${transactionId}`);
        });
    }

    addListener(transactionId: string, action: (domainEvent) => any) {
        this.listeners[transactionId] = action;
        this.startPolling();
    }

    removeListener(listener: any) {
        // nothing
    }

    private startPolling() {
        const pollOnce = () => {
            const incomingParams = {
                QueueUrl: this.config.eventQueueUrl,
                MaxNumberOfMessages: 1,
            };

            this.sqs.receiveMessage(incomingParams, (err, eventQueueData) => {
                if (err) {
                    this.log(err);
                    return;
                }
                const source = Rx.Observable.from(eventQueueData.Messages || []);
                this.subscribeToRelevantTransactions(source);
            });
        };
        pollOnce();
        if (!this.polling) {
            setInterval(() => {
                this.polling = true;
                pollOnce();
            }, this.config.pollingInterval || 5000);
        }
    }

    private subscribeToRelevantTransactions(source: Rx.Observable<any>) {
        source
            .map((message) => {
                return {
                    receiptHandle: message.ReceiptHandle || '',
                    transaction: JSON.parse(message.Body || ''),
                };
            })
            .filter((message) => {
                return message.transaction.transactionId;
            })
            .subscribe((message) => {
                this.log(`AwsEventEmitter: Data received from event queue: ${message.transaction.transactionId}`);
                try {
                    const action = this.listeners[message.transaction.transactionId];
                    action(message.transaction.payload);
                    this.removeFromEventQueue(message.receiptHandle);
                    delete this.listeners[message.transaction.transactionId];
                } catch (err) {
                    this.log(`AwsEventEmitter: ERROR: ${err}`);
                }
            });
    }

    private removeFromEventQueue(receiptHandle: string) {
        this.sqs.deleteMessage({
            QueueUrl: this.config.eventQueueUrl,
            ReceiptHandle: receiptHandle,
        }, (err, data) => {
            if (err) {
                this.log(err);
            }
            this.log(`Consumer: Removed command ${receiptHandle} from queue.`);
        });
    }

    private log(message): void {
        if (this.logger) {
            this.logger.log(message);
        }
    }
}
