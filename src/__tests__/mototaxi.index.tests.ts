// tslint:disable
import * as mototaxi from '../index';
import { SynchronousCommandDispatcher } from '../dispatchers/SynchronousCommandDispatcher';
import { AsynchronousCommandDispatcher } from '../dispatchers/AsynchronousCommandDispatcher';
import { IMotoTaxiConfig } from '../IMotoTaxiConfig';
import { AwsEventEmitter } from '../aws/AwsEventEmitter';

describe('Getting a Dispatcher', () => {
    describe('with no config', () => {
        const dispatcher = mototaxi.getDispatcher();
        it('should return the dispatcher', () => {
            expect(dispatcher).toBeInstanceOf(SynchronousCommandDispatcher);
        });
    });
    describe('with full config', () => {
        const config = {
            commandHandlers: []
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect(dispatcher).toBeInstanceOf(SynchronousCommandDispatcher);
        });
    });
    describe('with no command handlers', () => {
        const config = {
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher', () => {
            expect(dispatcher).toBeInstanceOf(SynchronousCommandDispatcher);
        });
    });
    describe('with sqs config', () => {
        const config: IMotoTaxiConfig = {
            sqs : {
                outgoingQueueUrl: 'https://sqs.us-east-1.amazonaws.com/487799950234/nonexistent',
                incomingQueueUrl: 'https://sqs.us-east-1.amazonaws.com/487799950234/nonexistent',
                access: 'access',
                region: 'us-east-1',
                secret: 'secret'
            }
        };
        const dispatcher = mototaxi.getDispatcher(config);
        it('should return the dispatcher with the aws event emitter', () => {
            expect(dispatcher).toBeInstanceOf(AsynchronousCommandDispatcher);
            const emitter = (dispatcher as any).eventEmitter;
            expect(emitter).toBeInstanceOf(AwsEventEmitter);
        });
    });
});
