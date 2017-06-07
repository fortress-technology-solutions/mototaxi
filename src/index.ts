import { SynchronousCommandDispatcher } from './dispatchers/SynchronousCommandDispatcher';
import { AsynchronousCommandDispatcher } from './dispatchers/AsynchronousCommandDispatcher';
import { IMotoTaxiConfig } from './IMotoTaxiConfig';
import { AwsEventEmitter } from './aws/AwsEventEmitter';
import { IEventEmitter } from './IEventEmitter';
import * as EventEmitter from 'events';
import 'rxjs/Rx';

const getDispatcher = (args?: IMotoTaxiConfig) => {
    args = args || {};
    let eventEmitter: IEventEmitter = new EventEmitter();
    const logger = args.logger ? args.logger : undefined;
    if (args.sqs) {
        eventEmitter = new AwsEventEmitter(args.sqs, logger);
        return new AsynchronousCommandDispatcher(eventEmitter, logger);
    }
    return new SynchronousCommandDispatcher(args.commandHandlers || [], logger);
};

export {
    getDispatcher,
};
