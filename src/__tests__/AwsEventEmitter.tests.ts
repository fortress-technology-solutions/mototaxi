// tslint:disable
import { AwsEventEmitter } from '../aws/AwsEventEmitter';
import 'rxjs/add/operator/filter';

describe('The AWS Event Emitter', () => {
    describe('when listening for domain events in the event queue', () => {
        const config = {
            eventQueueUrl: 'eventQueueUrl'
        };
        describe('with successful message with matching transaction', () => {
            const logger = {
                log: jest.fn()
            };
            const matchingTransactionId = '123';
            const transaction = { transactionId: matchingTransactionId, payload: { something: 'else' } };
            const receiptHandle = 'ewrtyu';
            const sqs = {
                receiveMessage: jest.fn((config, callback) => callback(null, {
                    Messages: [{ Body: JSON.stringify(transaction), ReceiptHandle: receiptHandle }]
                })),
                deleteMessage: jest.fn((config, callback) => callback({}, {}))
            };
            const eventEmitter = new AwsEventEmitter((sqs as any), (config as any), logger);
            const whenMessageReceived = jest.fn()
            eventEmitter.addListener(matchingTransactionId, whenMessageReceived);
            it('should process the domain event', () => {
                expect(whenMessageReceived.mock.calls[0][0]).toEqual(transaction.payload);
            });

            describe('and after processing the domain event', () => {

                it('should delete the domain event message from the queue using the receipt handle', () => {
                    expect(sqs.deleteMessage.mock.calls[0][0].ReceiptHandle).toBe(receiptHandle);
                });
                it('should delete the event from the right queue', () => {
                    expect(sqs.deleteMessage.mock.calls[0][0].QueueUrl).toBe(config.eventQueueUrl);
                });
            });
        });
    })
    describe('when emitting a command to the command queue', () => {
        const config = {
            commandQueueUrl: 'commandQueueUrl'
        };
        describe('with success', () => {
            const logger = {
                log: jest.fn()
            };
            const sqs = {
                sendMessage: jest.fn((config, callback) => callback()),
            };
            const eventEmitter = new AwsEventEmitter((sqs as any), (config as any), logger);
            const command = { something: 'else'};
            eventEmitter.emit('someId', command);
            it('should go with a transaction id', () => {
                expect(JSON.parse(sqs.sendMessage.mock.calls[0][0].MessageBody).transactionId).not.toBeFalsy();
            });
            it('should add the command as the payload', () => {
                expect(JSON.parse(sqs.sendMessage.mock.calls[0][0].MessageBody).payload).toEqual(command);
            });
            it('should direct the command to the right queue', () => {
                expect(sqs.sendMessage.mock.calls[0][0].QueueUrl).toBe(config.commandQueueUrl);
            });
            it('should log the transaction with the id', () => {
                const transactionId = JSON.parse(sqs.sendMessage.mock.calls[0][0].MessageBody).transactionId;
                expect(logger.log.mock.calls[0][0]).toContain(transactionId);
            });
        });
        describe('with an error from aws', () => {
            const error = 'error!';
            const logger = {
                log: jest.fn()
            };
            const sqs = {
                sendMessage: jest.fn((config, callback) => callback(error)),
            };
            const eventEmitter = new AwsEventEmitter((sqs as any), (config as any), logger);
            const command = { something: 'else'};
            eventEmitter.emit('anything', command);
            it('should log the error', () => {
                expect(logger.log.mock.calls[0][0]).toBe(error);
            });
        });
    });
});
