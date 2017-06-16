import { SynchronousCommandDispatcher } from './dispatchers/SynchronousCommandDispatcher';
import { AsynchronousCommandDispatcher } from './dispatchers/AsynchronousCommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';
import { AwsEventEmitter } from './aws/AwsEventEmitter';
import { IEventEmitter } from './IEventEmitter';
import * as EventEmitter from 'events';
import * as AWS from 'aws-sdk';
import 'rxjs/Rx';

const getDispatcher = (config?: IMotoTaxiConfig) => {
    config = config || {};
    let eventEmitter: IEventEmitter = new EventEmitter();
    const logger = config.logger ? config.logger : undefined;
    if (config.sqs) {
        const sqs = new AWS.SQS({region: config.sqs.region});
        eventEmitter = new AwsEventEmitter(sqs, config.sqs, logger);
        return new AsynchronousCommandDispatcher(eventEmitter, logger);
    }
    return new SynchronousCommandDispatcher(config.commandHandlers || [], logger);
};

export {
    getDispatcher,
};
