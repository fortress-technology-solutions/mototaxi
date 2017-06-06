import { CommandDispatcher } from './CommandDispatcher';
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
    }
    return new CommandDispatcher(args.commandHandlers || [], eventEmitter, logger);
};

export {
    getDispatcher,
};
